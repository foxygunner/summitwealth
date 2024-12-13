import { notFound } from "next/navigation";
import Link from "next/link";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { getStatusIcon, getTransactionType } from "@/lib/utils/transactions";
import { formatCurrency } from "@/lib/utils";
import { getCachedTransaction } from "@/lib/services/transactions";

const TransactionDetailCard = async ({
  transactionId,
}: {
  transactionId: string;
}) => {
  const transaction = await getCachedTransaction(transactionId);

  if (!transaction) {
    notFound();
  }

  const showPaymentLink =
    transaction.status === "PENDING" && transaction.type === "DEPOSIT";

  return (
    <Card className="w-full max-w-2xl mx-auto">
      <CardHeader>
        <CardTitle className="text-2xl font-bold">
          Transaction Details
        </CardTitle>
      </CardHeader>
      <CardContent className="grid gap-4">
        <div className="grid sm:grid-cols-2 gap-4">
          <div>
            <h3 className="text-sm font-medium text-muted-foreground">
              Transaction ID
            </h3>
            <p className="text-sm font-medium">{transaction.id}</p>
          </div>
          <div>
            <h3 className="text-sm font-medium text-muted-foreground">Type</h3>
            <p className="text-sm font-medium">
              {getTransactionType(transaction.type)}
            </p>
          </div>
          <div>
            <h3 className="text-sm font-medium text-muted-foreground">
              Status
            </h3>
            <Badge
              variant={
                transaction.status === "CONFIRMED"
                  ? "success"
                  : transaction.status === "FAILED"
                  ? "destructive"
                  : "warning"
              }
            >
              {getStatusIcon(transaction.status)}{" "}
              <span className="ml-2">{transaction.status}</span>
            </Badge>
          </div>
          <div>
            <h3 className="text-sm font-medium text-muted-foreground">
              Amount
            </h3>
            <p className="text-sm font-medium">
              {formatCurrency(transaction.amount)}
            </p>
          </div>
        </div>
        <Separator />
        <div className="grid sm:grid-cols-2 gap-4">
          <div>
            <h3 className="text-sm font-medium text-muted-foreground">
              Created At
            </h3>
            <p className="text-sm font-medium">
              {transaction.createdAt.toLocaleString()}
            </p>
          </div>
          <div>
            <h3 className="text-sm font-medium text-muted-foreground">
              Updated At
            </h3>
            <p className="text-sm font-medium">
              {transaction.updatedAt.toLocaleString()}
            </p>
          </div>
        </div>
        <Separator />
        <div>
          <h3 className="text-sm font-medium text-muted-foreground mb-2">
            Associated Investment
          </h3>
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium">
                {transaction.investment.tranche.name}
              </p>
              <p className="text-xs text-muted-foreground">
                ID: {transaction.investment.id}
              </p>
            </div>
            <Button asChild variant="outline">
              <Link
                href={`/dashboard/investments/${transaction.investment.id}`}
              >
                View Investment
              </Link>
            </Button>
          </div>
        </div>
      </CardContent>
      <CardFooter className="justify-between">
        {showPaymentLink && (
          <Button asChild>
            <Link
              href={`https://nowpayments.io/payment/?iid=${transaction.txId}`}
              target="_blank"
            >
              Make Payment
            </Link>
          </Button>
        )}
        <Button variant="secondary">Contact Support</Button>
      </CardFooter>
    </Card>
  );
};

export default TransactionDetailCard;
