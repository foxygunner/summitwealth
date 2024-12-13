import { headers } from "next/headers";
import { redirect } from "next/navigation";

import DashboardLayout from "@/components/dashboard/layout/dashboard-layout";
import { auth } from "@/lib/auth";
import { getCachedUserTransactions } from "@/lib/services/transactions";
import { TransactionTable } from "./_components/transaction-table";
import NoTransactionsCard from "../overview/_components/no-transactions-card";

export const metadata = {
  title: "Dashboard : Your Transactions",
};

const TransactionsPage = async () => {
  const session = await auth.api.getSession({
    headers: headers(), // you need to pass the headers object.
  });

  if (!session) {
    redirect("/login");
  }

  const data = await getCachedUserTransactions(session.user.id);

  return (
    <DashboardLayout
      appHeaderProps={{
        primaryBreadcrumb: { link: "/dashboard/overview", title: "Dashboard" },
        secondaryBreadcrumb: "Transactions",
      }}
    >
      <div className="space-y-2">
        <div className="flex items-center justify-between space-y-2">
          <h2 className="text-2xl font-bold tracking-tight">
            Your Transactions ⇆
          </h2>
        </div>
        {data.length === 0 ? (
          <NoTransactionsCard className="!mt-16" />
        ) : (
          <TransactionTable data={data} />
        )}
      </div>
    </DashboardLayout>
  );
};

export default TransactionsPage;
