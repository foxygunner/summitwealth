import { headers } from "next/headers";
import { notFound, redirect } from "next/navigation";

import { auth } from "@/lib/auth";
import DashboardLayout from "@/components/dashboard/layout/dashboard-layout";
import { getCachedUserInvestmentDetail } from "@/lib/services/investments";
import StatsContainer from "./_components/stats-container";
import InvestmentDetailsCard from "./_components/investment-details-card";
import InvestmentTransactions from "./_components/investment-transactions";

type InvestmentDetailPageParam = { params: { id: string } };

export default async function InvestmentDetailPage({
  params: { id },
}: InvestmentDetailPageParam) {
  const session = await auth.api.getSession({
    headers: headers(), // you need to pass the headers object.
  });

  if (!session) {
    redirect("/login");
  }

  const investmentData = await getCachedUserInvestmentDetail(
    session.user.id,
    id
  );

  if (!investmentData) {
    notFound();
  }

  return (
    <DashboardLayout
      appHeaderProps={{
        primaryBreadcrumb: {
          link: "/dashboard/investments",
          title: "Investments",
        },
        secondaryBreadcrumb: "Investment Detail",
      }}
    >
      <div className="container mx-auto p-6 space-y-6">
        <h1 className="text-3xl font-bold mb-6">Investment Details</h1>

        <StatsContainer investmentData={investmentData} />

        <InvestmentDetailsCard investmentData={investmentData} />

        <InvestmentTransactions investmentData={investmentData} />
      </div>
    </DashboardLayout>
  );
}
