import { unstable_cache } from "next/cache";
import { differenceInDays } from "date-fns";

import prisma from "../prisma";
import {
  defaultChartData,
  defaultUserStats,
  getTxType,
  GetUserStats,
  UserChartData,
} from "../validations/user";
import { getInvestmentReward } from "../utils/investment";

const getUserStats = async (id: string): Promise<GetUserStats> => {
  try {
    const userDetails = await prisma.user.findUniqueOrThrow({
      where: { id },
      select: {
        investments: {
          include: {
            tranche: true,
          },
          where: { status: "CONFIRMED" },
        },
        evmwalletAddress: true,
        _count: { select: { referrals: true } },
      },
    });

    const investmentPlan = userDetails.investments
      .filter((investment) => !!investment.started && !investment.ended)
      .sort((a, b) => b.dailyProfit - a.dailyProfit)[0]?.tranche.name;

    const initialValue = { txsValue: 0, unclaimedRewards: 0, totalRewards: 0 };

    const rewardValue = userDetails.investments.reduce(
      (accumulator, currentValue) => {
        const { dailyProfitIncrease, fee } = currentValue.tranche;

        const presentReward = currentValue.started
          ? getInvestmentReward({
              multiplier: dailyProfitIncrease,
              noOfDaysStaked: differenceInDays(
                currentValue.ended ?? new Date(),
                currentValue.started
              ),
              stakeAmount: fee,
              referralCount: userDetails._count.referrals,
            })
          : 0;

        const totalRewards = accumulator.totalRewards + presentReward;
        if (currentValue.started && !currentValue.ended) {
          const noOfdays = differenceInDays(
            new Date(),
            currentValue.lastClaimed ?? currentValue.started
          );
          const profit = getInvestmentReward({
            multiplier: dailyProfitIncrease,
            noOfDaysStaked: noOfdays,
            stakeAmount: fee,
            referralCount: userDetails._count.referrals,
          });
          return {
            unclaimedRewards: accumulator.unclaimedRewards + profit,
            txsValue: accumulator.txsValue + fee,
            totalRewards,
          };
        }
        return {
          txsValue: accumulator.txsValue + fee,
          totalRewards,
          unclaimedRewards: accumulator.unclaimedRewards,
        };
      },
      initialValue
    );

    const groupTransactions = await prisma.transaction.groupBy({
      by: ["type"],
      where: {
        investment: {
          userId: id,
        },
        status: "CONFIRMED",
      },
      _sum: {
        amount: true,
      },
    });

    const chartData: UserChartData = defaultChartData.map((defaultData) => {
      const value =
        groupTransactions.find(
          (x) => getTxType(x.type) === defaultData.transactionType
        )?._sum.amount || 0;
      return { ...defaultData, value };
    });

    return {
      ...rewardValue,
      noOftxs: userDetails.investments.length,
      investmentPlan,
      referrals: userDetails._count.referrals,
      chartData,
      walletaddress: userDetails.evmwalletAddress,
    };
  } catch (error) {
    console.log("GET_USER_STATS", error);
    return defaultUserStats;
  }
};

export const getCachedUserStats = unstable_cache(
  async (userId: string) => getUserStats(userId),
  ["user-stats"],
  { revalidate: 3600 }
);
