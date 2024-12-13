import { unstable_cache } from "next/cache";

import prisma from "../prisma";

const getUserTransactions = async (userId: string) => {
  try {
    return prisma.transaction.findMany({
      where: { investment: { userId } },
      orderBy: { updatedAt: "desc" },
      include: {
        investment: {
          select: { id: true, tranche: { select: { name: true } } },
        },
      },
    });
  } catch (error) {
    console.log("GET_USER_TRANSACTIONS", error);
    return [];
  }
};

const getTransaction = async (id: string) => {
  try {
    return prisma.transaction.findUnique({
      where: { id },
      include: {
        investment: {
          select: { id: true, tranche: { select: { name: true } } },
        },
      },
    });
  } catch (error) {
    console.log("GET_TRANSACTION", error);
    return null;
  }
};

export const getCachedUserTransactions = unstable_cache(
  async (userId: string) => getUserTransactions(userId),
  ["user-transactions"],
  { revalidate: 3600 }
);

export const getCachedTransaction = unstable_cache(
  async (transactionId: string) => getTransaction(transactionId),
  ["transactions"],
  { revalidate: 3600 }
);
