import { cookies, headers } from "next/headers";

import { SidebarInset, SidebarProvider } from "@/components/ui/sidebar";
import { AppSidebar } from "@/components/dashboard/layout/app-sidebar";
import PageContainer from "@/components/dashboard/page-container";
import { auth } from "@/lib/auth";

export default async function Layout({
  children,
}: {
  children: React.ReactNode;
}) {
  const cookieStore = cookies();
  const defaultOpen = cookieStore.get("sidebar:state")?.value === "true";

  const session = await auth.api.getSession({
    headers: headers(), // you need to pass the headers object.
  });

  return (
    <SidebarProvider defaultOpen={defaultOpen}>
      <AppSidebar session={session} />
      <SidebarInset>
        <PageContainer scrollable>{children}</PageContainer>
      </SidebarInset>
    </SidebarProvider>
  );
}
