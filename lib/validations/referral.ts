import { Prisma } from "@prisma/client";

export type ReferralsPayload = Prisma.ReferralGetPayload<{
  include: {
    referred: { select: { name: true } };
    referrer: { select: { name: true } };
  };
}>;
