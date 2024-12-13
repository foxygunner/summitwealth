import { Investment } from "@prisma/client";
import { Eye, MoveDown } from "lucide-react";
import Link from "next/link";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

type InvestNowCardProps = {
  pendingInvestment?: Investment & { trancheName: string };
};

export function InvestNowCard({ pendingInvestment }: InvestNowCardProps) {
  return (
    <Card className="w-full mb-8 bg-primary text-primary-foreground">
      <CardHeader>
        <CardTitle>
          {pendingInvestment
            ? "Finalize Your Investment"
            : "Start Investing Today"}
        </CardTitle>
      </CardHeader>
      <CardContent>
        <p className="text-lg mb-4">
          {pendingInvestment
            ? `Complete your payment to activate your investment plan. (${pendingInvestment.trancheName})`
            : `Unlock your financial potential by investing in one of our tranche
          plans. Choose a plan that suits your goals and start growing your
          wealth.`}
        </p>
        <ul className="list-disc list-inside space-y-2">
          <li>Access to exclusive crypto investment opportunities</li>
          <li>Daily profit increases</li>
          <li>Flexible cool-down intervals</li>
          <li>Competitive minimum stake structures</li>
        </ul>
      </CardContent>
      <CardFooter>
        {pendingInvestment ? (
          <Button variant="secondary" className="w-full" asChild>
            <Link href={`/dashboard/investments/${pendingInvestment.id}`}>
              View / Cancel Investment
            </Link>
          </Button>
        ) : (
          <Button variant="secondary" className="w-full" asChild>
            <Link href={"/dashboard/plans#plans"}>
              Explore Plans <MoveDown />
            </Link>
          </Button>
        )}
      </CardFooter>
    </Card>
  );
}
