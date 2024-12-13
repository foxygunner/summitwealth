import DashboardLayout from "@/components/dashboard/layout/dashboard-layout";
import TransactionDetailCard from "./_components/transaction-detail-card";

export default async function TransactionDetailPage({
  params,
}: {
  params: { id: string };
}) {
  return (
    <DashboardLayout
      appHeaderProps={{
        primaryBreadcrumb: {
          link: "/dashboard/transactions",
          title: "Transactions",
        },
        secondaryBreadcrumb: `${params.id.substring(0, 7)}`,
      }}
    >
      <div className="space-y-2">
        <div className="flex items-center justify-between space-y-2">
          <h2 className="text-2xl font-bold tracking-tight">
            Transaction Receipt 🧾
          </h2>
        </div>
        <TransactionDetailCard transactionId={params.id} />
      </div>
    </DashboardLayout>
  );
}
