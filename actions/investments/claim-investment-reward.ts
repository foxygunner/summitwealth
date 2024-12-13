"use server";

import { headers } from "next/headers";
import { revalidatePath } from "next/cache";

import { auth } from "@/lib/auth";
import prisma from "@/lib/prisma";
import { investmentCancelSchema } from "@/lib/validations/investment";
import { inngest } from "@/inngest/client";
import { differenceInDays } from "date-fns";
import { getInvestmentReward } from "@/lib/utils/investment";

export const claimReward = async (params: unknown) => {
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
      select: {
        tranche: {
          select: {
            fee: true,
            cooldownInterval: true,
            dailyProfitIncrease: true,
          },
        },
        id: true,
        started: true,
        lastClaimed: true,
        user: { select: { _count: { select: { referrals: true } } } },
      },
    });

    if (!investment?.started) {
      return { error: "Investment plan not found" };
    }

    // ensure cooldown period is elapsed
    if (
      investment.tranche.cooldownInterval >=
      differenceInDays(new Date(), investment.started)
    ) {
      return { error: "Cool down period not yet elapsed" };
    }

    // update investment lastClaimed to now to prevent double entry attack
    const claimedInvestment = await prisma.investment.update({
      where: { id },
      data: {
        lastClaimed: new Date(),
      },
    });

    const reward = getInvestmentReward({
      multiplier: investment.tranche.dailyProfitIncrease,
      noOfDaysStaked: differenceInDays(
        new Date(),
        investment.lastClaimed ?? investment.started
      ),
      stakeAmount: investment.tranche.fee,
      referralCount: investment.user._count.referrals,
    });
    //  connect new pending CLAIM_REWARD tx (amount => reward)
    const withdrawTx = await prisma.transaction.create({
      data: {
        amount: reward,
        type: "CLAIM_REWARD",
        investmentId: investment.id,
        status: "PENDING",
      },
    });

    // send new transaction Id for payment processing
    await inngest.send({
      name: "investment/plan.claim",
      data: {
        withdrawTxId: withdrawTx.id,
      },
    });

    // revalidate layout
    revalidatePath("/", "layout");

    return { success: claimedInvestment.id };
  } catch (error) {
    console.error("CLAIM_INVESTMENT_REWARD", error);
    return { error: "Server Error" };
  }
};
