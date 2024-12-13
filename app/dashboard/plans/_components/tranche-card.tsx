import { Tranche } from "@prisma/client";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { formatCurrency } from "@/lib/utils";
import { InvestForm } from "./invest-form";

interface TrancheCardProps {
  tranche: Tranche;
  isCurrentTranche: boolean;
  isSuggestedPlan: boolean;
  activeInvestment: boolean;
  pendingInvestment: boolean;
}

export function TrancheCard({
  isCurrentTranche,
  isSuggestedPlan,
  activeInvestment,
  tranche,
  pendingInvestment,
}: TrancheCardProps) {
  const {
    cooldownInterval,
    dailyProfitIncrease,
    fee,
    id: trancheId,
    name,
  } = tranche;

  return (
    <Card className={`w-full ${isCurrentTranche ? "border-primary" : ""}`}>
      <CardHeader>
        <CardTitle className="flex items-center justify-between">
          {name}
          {isCurrentTranche ? (
            <Badge variant="outline">Current Plan</Badge>
          ) : isSuggestedPlan ? (
            <Badge variant="secondary">Suggested Plan</Badge>
          ) : null}
        </CardTitle>
      </CardHeader>
      <CardContent>
        <dl className="space-y-2">
          <div className="flex justify-between">
            <dt>Minimum Stake:</dt>
            <dd>{formatCurrency(fee)}</dd>
          </div>
          <div className="flex justify-between">
            <dt>Cool Down:</dt>
            <dd>{cooldownInterval} days</dd>
          </div>
          <div className="flex justify-between">
            <dt>Daily Profit Increase:</dt>
            <dd>{dailyProfitIncrease}%</dd>
          </div>
        </dl>
      </CardContent>
      <CardFooter>
        {activeInvestment ? (
          <Button
            className="w-full"
            variant={isCurrentTranche ? "outline" : "default"}
            disabled={activeInvestment}
          >
            {isCurrentTranche ? "Current Plan" : "Invest Now"}
          </Button>
        ) : pendingInvestment ? (
          <Button
            className="w-full"
            variant={isCurrentTranche ? "outline" : "default"}
            disabled={pendingInvestment}
          >
            {isCurrentTranche ? "Current Plan" : "Invest Now"}
          </Button>
        ) : (
          <InvestForm trancheId={trancheId} />
        )}
      </CardFooter>
    </Card>
  );
}
