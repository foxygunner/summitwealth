import { Tranche } from "@prisma/client";
import Link from "next/link";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { formatCurrency } from "@/lib/utils";

interface CurrentPlanCardProps {
  tranche: Tranche;
  investmentId: string;
  unclaimedRewards: number;
}

export function CurrentPlanCard({
  tranche: { cooldownInterval, dailyProfitIncrease, fee, name },
  investmentId,
  unclaimedRewards,
}: CurrentPlanCardProps) {
  return (
    <Card className="w-full mb-8">
      <CardHeader>
        <CardTitle>Your Current Plan: {name}</CardTitle>
      </CardHeader>
      <CardContent>
        <dl className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <dt className="font-medium">Stake:</dt>
            <dd>{formatCurrency(fee)}</dd>
          </div>
          <div>
            <dt className="font-medium">Cool Down Interval:</dt>
            <dd>{cooldownInterval} days</dd>
          </div>
          <div>
            <dt className="font-medium">Daily Profit Increase:</dt>
            <dd>{dailyProfitIncrease}%</dd>
          </div>
          <div className="md:col-span-2">
            <dt className="font-medium">Unclaimed Earnings:</dt>
            <dd>{formatCurrency(unclaimedRewards)}</dd>
          </div>
          <div>
            <dt className="font-medium">Investment:</dt>
            <dd>
              <Link href={`/dashboard/investments/${investmentId}`}>
                {name}
              </Link>
            </dd>
          </div>
        </dl>
      </CardContent>
      <CardFooter>
        <Button className="w-full">View Plan</Button>
        <Button variant="destructive" className="w-full">
          Cancel Plan
        </Button>
      </CardFooter>
    </Card>
  );
}
