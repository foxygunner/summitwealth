import DashboardLayout from "@/components/dashboard/layout/dashboard-layout";

export const metadata = {
  title: "Dashboard : Appearance",
};

export default function AppearanceLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <DashboardLayout
      appHeaderProps={{
        primaryBreadcrumb: {
          link: "/dashboard/settings/account",
          title: "Settings",
        },
        secondaryBreadcrumb: "Appearance",
      }}
    >
      <div className="space-y-2">
        <div className="flex items-center justify-between space-y-2">
          <h2 className="text-2xl font-bold tracking-tight">
            Theme Settings 🎨
          </h2>
        </div>
        {children}
      </div>
    </DashboardLayout>
  );
}
