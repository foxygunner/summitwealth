import DashboardLayout from "@/components/dashboard/layout/dashboard-layout";
import OverViewPage from "./_components/overview";

export const metadata = {
  title: "Dashboard : Overview",
};

export default function DashboardPage() {
  return (
    <DashboardLayout
      appHeaderProps={{
        primaryBreadcrumb: { link: "/dashboard/overview", title: "Dashboard" },
        secondaryBreadcrumb: "Overview",
      }}
    >
      <OverViewPage />
    </DashboardLayout>
  );
}
