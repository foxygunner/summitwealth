"use client";

import * as React from "react";
import {
  ArrowRightLeft,
  Speech,
  LayoutDashboard,
  LifeBuoy,
  Settings2,
  Coins,
  Sprout,
} from "lucide-react";

import { NavMain } from "@/components/dashboard/layout/nav-main";
import { NavSecondary } from "@/components/dashboard/layout/nav-secondary";
import { NavUser } from "@/components/dashboard/layout/nav-user";
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar";
import { BrandName } from "@/components/layout/brand-name";
import { Session } from "@/lib/auth";

const data = {
  navMain: [
    {
      title: "Dashboard",
      url: "/dashboard/overview",
      icon: LayoutDashboard,
      isActive: true,
      items: [
        {
          title: "Overview",
          url: "/dashboard/overview",
        },
      ],
    },
    {
      title: "Transactions",
      url: "/dashboard/transactions",
      icon: ArrowRightLeft,
      items: [],
    },
    {
      title: "Investments",
      url: "/dashboard/investments",
      icon: Coins,
      items: [],
    },
    {
      title: "Referrals",
      url: "/dashboard/referrals",
      icon: Speech,
      items: [],
    },
    {
      title: "Settings",
      url: "/dashboard/settings/account",
      icon: Settings2,
      items: [
        {
          title: "Account",
          url: "/dashboard/settings/account",
        },
        {
          title: "Appearance",
          url: "/dashboard/settings/appearance",
        },
      ],
    },
  ],
  navSecondary: [
    {
      title: "Invest",
      url: "/dashboard/plans",
      icon: Sprout,
    },
    {
      title: "Support",
      url: "#",
      icon: LifeBuoy,
    },
  ],
};

type AppSidebarProps = React.ComponentProps<typeof Sidebar> & {
  session: Session | null;
};

export function AppSidebar({ session, ...props }: AppSidebarProps) {
  return (
    <Sidebar variant="inset" {...props}>
      <SidebarHeader>
        <SidebarMenu>
          <SidebarMenuItem>
            <SidebarMenuButton size="lg" asChild>
              <BrandName />
            </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarHeader>
      <SidebarContent>
        <NavMain items={data.navMain} />
        <NavSecondary items={data.navSecondary} className="mt-auto" />
      </SidebarContent>
      <SidebarFooter>
        <NavUser session={session} />
      </SidebarFooter>
    </Sidebar>
  );
}
