import { unstable_cache } from "next/cache";

import prisma from "../prisma";

const getTranches = async (userId?: string) => {
  try {
    return prisma.tranche.findMany({
      include: {
        investments: {
          where: { userId, status: { not: "CANCELLED" }, ended: null },
        },
      },
    });
  } catch (error) {
    console.log("GET_TRANCHES", error);
    return [];
  }
};

export const getCachedTranches = unstable_cache(
  async (userId?: string) => getTranches(userId),
  ["site-tranches"],
  { revalidate: 3600 }
);
