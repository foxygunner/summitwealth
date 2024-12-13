import React from "react";
import { headers } from "next/headers";
import { redirect } from "next/navigation";

import { auth } from "@/lib/auth";
import { getCachedUserStats } from "@/lib/services/user";
import { PieGraph } from "./pie-graph";
import NoTransactionsCard from "./no-transactions-card";

const PieGraphContainer = async () => {
  const session = await auth.api.getSession({
    headers: headers(), // you need to pass the headers object.
  });

  if (!session) {
    redirect("/login");
  }

  const { chartData } = await getCachedUserStats(session.user.id);

  const totalValue = chartData.reduce((acc, curr) => acc + curr.value, 0);

  if (totalValue === 0) {
    return <NoTransactionsCard className="col-span-4" />;
  }

  return (
    <div className="col-span-4">
      <PieGraph chartData={chartData} />
    </div>
  );
};

export default PieGraphContainer;
