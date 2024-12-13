import { headers } from "next/headers";
import { redirect } from "next/navigation";

import { auth } from "@/lib/auth";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import DashboardLayout from "@/components/dashboard/layout/dashboard-layout";
import prisma from "@/lib/prisma";
import { siteConfig } from "@/config/site";
import UserReferrals from "./_components/user-referrals";
import ReferralLeaderboard from "./_components/referral-leaderboard";

export default async function ReferralsPage() {
  const session = await auth.api.getSession({
    headers: headers(), // you need to pass the headers object.
  });

  if (!session) {
    redirect("/login");
  }

  const referralLink = `${siteConfig.url}/register?ref=${session.user.id}`;

  const referrals = await prisma.referral.findMany({
    include: {
      referred: { select: { name: true } },
      referrer: { select: { name: true } },
    },
  });

  const userReferrals = referrals.filter(
    (referral) => referral.referrerId === session.user.id
  );

  return (
    <DashboardLayout
      appHeaderProps={{
        primaryBreadcrumb: {
          link: "/dashboard/overview",
          title: "Dashboard",
        },
        secondaryBreadcrumb: "Referrals",
      }}
    >
      <div className="container mx-auto px-4 py-8">
        <h1 className="text-3xl font-bold mb-6">Referrals Dashboard</h1>
        <Tabs defaultValue="user-info" className="w-full">
          <TabsList>
            <TabsTrigger value="user-info">Your Referrals</TabsTrigger>
            <TabsTrigger value="leaderboard">Leaderboard</TabsTrigger>
          </TabsList>
          <TabsContent value="user-info">
            <UserReferrals
              userReferrals={userReferrals}
              referralLink={referralLink}
            />
          </TabsContent>
          <TabsContent value="leaderboard">
            <ReferralLeaderboard referrals={referrals} />
          </TabsContent>
        </Tabs>
      </div>
    </DashboardLayout>
  );
}
