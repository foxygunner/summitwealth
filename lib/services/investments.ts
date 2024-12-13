import { unstable_cache } from "next/cache";

import prisma from "../prisma";

const getUserInvestments = async (userId: string) => {
  try {
    return prisma.investment.findMany({
      where: { userId },
      include: {
        _count: { select: { transactions: true } },
        tranche: { select: { name: true, fee: true } },
      },
      orderBy: { updatedAt: "desc" },
      take: 4,
    });
  } catch (error) {
    console.log("GET_USER_INVESTMENTS", error);
    return [];
  }
};

const getUserInvestmentDetail = async (userId: string, id: string) => {
  try {
    return prisma.investment.findUnique({
      where: { id, userId },
      include: {
        transactions: {
          include: { investment: { include: { tranche: true } } },
          orderBy: { updatedAt: "desc" },
        },
        user: { select: { evmwalletAddress: true } },
        tranche: true,
      },
    });
  } catch (error) {
    console.log("GET_USER_INVESTMENT_DETAIL", error);
    return null;
  }
};

export const getCachedUserInvestments = unstable_cache(
  async (userId: string) => getUserInvestments(userId),
  ["user-investments"],
  { revalidate: 3600 }
);

export const getCachedUserInvestmentDetail = unstable_cache(
  async (userId: string, id: string) => getUserInvestmentDetail(userId, id),
  ["user-investments"],
  { revalidate: 3600 }
);
