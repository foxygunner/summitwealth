"use server";

import { headers } from "next/headers";
import { revalidatePath } from "next/cache";

import { auth } from "@/lib/auth";
import prisma from "@/lib/prisma";
import { investmentCancelSchema } from "@/lib/validations/investment";
import { inngest } from "@/inngest/client";

export const endInvestment = async (params: unknown) => {
  const validatedFields = investmentCancelSchema.safeParse(params);

  if (!validatedFields.success) {
    return { error: "Invalid params!" };
  }

  const { id } = validatedFields.data;

  try {
    // ensure user is logged in
    const session = await auth.api.getSession({
      headers: headers(), // you need to pass the headers object.
    });
    if (!session) {
      return { error: "Unauthenticated" };
    }

    const { id: userId } = session.user;

    // ensure this investment is CONFIRMED, started, not ended & owned by user
    const investment = await prisma.investment.findUnique({
      where: { userId, id, status: "CONFIRMED", ended: null },
      select: { tranche: { select: { fee: true } }, id: true },
    });

    if (!investment) {
      return { error: "Investment plan not found" };
    }

    // end investment plan and create pending WITHDRAWAL tx
    // (amount => fee) to prevent double entry attack
    const endedInvestment = await prisma.investment.update({
      where: { id },
      data: {
        ended: new Date(),
        transactions: {
          create: {
            amount: investment.tranche.fee,
            type: "WITHDRAWAL",
            status: "PENDING",
          },
        },
      },
    });

    // send plan end event (should call pay endpoint, send TG/user mail and update txid)
    await inngest.send({
      name: "investment/plan.end",
      data: {
        investmentId: endedInvestment.id,
      },
    });

    // revalidate layout
    revalidatePath("/", "layout");

    return { success: endedInvestment.id };
  } catch (error) {
    console.error("END_INVESTMENT", error);
    return { error: "Server Error" };
  }
};
