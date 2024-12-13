import { redirect } from "next/navigation";
import { headers } from "next/headers";
import Link from "next/link";
import { ArrowRight, ArrowUpRight } from "lucide-react";

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { getStatusIcon } from "@/lib/utils/transactions";
import { getCachedUserTransactions } from "@/lib/services/transactions";
import { auth } from "@/lib/auth";
import { formatCurrency } from "@/lib/utils";
import NoTransactionsCard from "./no-transactions-card";

export async function RecentTransactionsCard() {
  const session = await auth.api.getSession({
    headers: headers(), // you need to pass the headers object.
  });

  if (!session) {
    redirect("/login");
  }

  const transactions = await getCachedUserTransactions(session.user.id);

  if (transactions.length < 1) {
    return <NoTransactionsCard className="col-span-4 md:col-span-3" />;
  }

  return (
    <Card className="col-span-4 md:col-span-3">
      <CardHeader>
        <CardTitle>Recent Transactions</CardTitle>
        <CardDescription>
          You made {transactions.length} transaction(s).
        </CardDescription>
      </CardHeader>
      <CardContent>
        <ul className="space-y-4">
          {transactions.slice(0, 4).map((transaction) => (
            <li
              key={transaction.id}
              className="flex items-center justify-between p-4 rounded-lg"
            >
              <div className="flex items-center space-x-4">
                <div className="flex-shrink-0">
                  {getStatusIcon(transaction.status)}
                </div>
                <div>
                  <p className="text-sm font-medium">{transaction.type}</p>
                </div>
              </div>
              <div className="text-right">
                <p className="text-sm font-semibold">
                  {transaction.type !== "DEPOSIT" ? "- " : "+ "}
                  {formatCurrency(transaction.amount)}
                </p>
                <Link
                  href={`/dashboard/investments/${transaction.investmentId}`}
                  className="text-xs text-muted-foreground hover:underline flex items-center justify-end mt-1"
                >
                  {transaction.investment.tranche.name}
                  <ArrowUpRight className="h-3 w-3 ml-1" />
                </Link>
              </div>
              <Button variant="ghost" size="sm" asChild>
                <Link href={`/dashboard/transactions/${transaction.id}`}>
                  <ArrowRight className="h-4 w-4 ml-1" />
                </Link>
              </Button>
            </li>
          ))}
        </ul>
      </CardContent>
    </Card>
  );
}
