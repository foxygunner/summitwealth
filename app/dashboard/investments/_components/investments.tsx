import { headers } from "next/headers";
import { redirect } from "next/navigation";

import { auth } from "@/lib/auth";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Tabs, TabsList } from "@/components/ui/tabs";
import { getCachedUserInvestments } from "@/lib/services/investments";
import InvestmentsTab from "./investments-tab";
import InvestmentsTabTrigger from "./investments-tab-trigger";
import NoTransactionsCard from "../../overview/_components/no-transactions-card";

export async function Investments() {
  const session = await auth.api.getSession({
    headers: headers(), // you need to pass the headers object.
  });

  if (!session) {
    redirect("/login");
  }

  const investments = await getCachedUserInvestments(session.user.id);

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-4">
          <Avatar>
            <AvatarImage src="/avatars/shadcn.jpeg" alt="User" />
            <AvatarFallback>{session.user.name.substring(0, 2)}</AvatarFallback>
          </Avatar>
          <div>
            <h2 className="text-2xl font-bold">{session.user.name}</h2>
          </div>
        </div>
      </div>

      {investments.length > 0 ? (
        <Tabs defaultValue="all">
          <TabsList>
            <InvestmentsTabTrigger tabValue="all" title="All" />
            <InvestmentsTabTrigger tabValue="CONFIRMED" title="Confirmed" />
            <InvestmentsTabTrigger tabValue="PENDING" title="Pending" />
            <InvestmentsTabTrigger tabValue="CANCELLED" title="Cancelled" />
          </TabsList>
          <InvestmentsTab investments={investments} tabValue="all" />
          <InvestmentsTab
            investments={investments.filter(
              (inv) => inv.status === "CONFIRMED"
            )}
            tabValue="CONFIRMED"
          />
          <InvestmentsTab
            tabValue="PENDING"
            investments={investments.filter((inv) => inv.status === "PENDING")}
          />
          <InvestmentsTab
            investments={investments.filter(
              (inv) => inv.status === "CANCELLED"
            )}
            tabValue="CANCELLED"
          />
        </Tabs>
      ) : (
        <NoTransactionsCard />
      )}
    </div>
  );
}
