import DashboardLayout from "@/components/dashboard/layout/dashboard-layout";
import { Investments } from "./_components/investments";

export const metadata = {
  title: "Dashboard : Investments",
};

export default function InvestmentsPage() {
  return (
    <DashboardLayout
      appHeaderProps={{
        primaryBreadcrumb: { link: "/dashboard/overview", title: "Dashboard" },
        secondaryBreadcrumb: "Investments",
      }}
    >
      <div className="space-y-2">
        <Investments />
      </div>
    </DashboardLayout>
  );
}
