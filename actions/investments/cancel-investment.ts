"use server";

import { headers } from "next/headers";
import { revalidatePath } from "next/cache";

import { auth } from "@/lib/auth";
import prisma from "@/lib/prisma";
import { investmentCancelSchema } from "@/lib/validations/investment";

export const cancelInvestment = async (params: unknown) => {
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

    // ensure this investment is pending & owned by user
    const investment = await prisma.investment.findUnique({
      where: { userId, id, status: "PENDING" },
    });

    if (!investment) {
      return { error: "Investment plan not found" };
    }

    // cancel investment plan and associated pending deposit tx
    const cancelledInvestment = await prisma.investment.update({
      where: { id },
      data: {
        status: "CANCELLED",
        transactions: {
          updateMany: {
            where: { status: "PENDING", type: "DEPOSIT" },
            data: { status: "FAILED" },
          },
        },
      },
    });

    // send cancelled plan event (send TG)

    // revalidate layout
    revalidatePath("/", "layout");

    return { success: cancelledInvestment.id };
  } catch (error) {
    console.error("CANCEL_INVESTMENT", error);
    return { error: "Server Error" };
  }
};
