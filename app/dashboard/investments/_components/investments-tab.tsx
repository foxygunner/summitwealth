import Link from "next/link";

import { Badge } from "@/components/ui/badge";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { TabsContent } from "@/components/ui/tabs";
import { formatCurrency } from "@/lib/utils";
import {
  getStatusColor,
  InvestmentsPayload,
  InvestmentTab,
} from "@/lib/validations/investment";

type InvestmentsTabProps = {
  investments: InvestmentsPayload[];
  tabValue: InvestmentTab;
};

const InvestmentsTab = ({ investments, tabValue }: InvestmentsTabProps) => {
  return (
    <TabsContent
      value={tabValue}
      className="grid grid-cols-1 gap-4 md:grid-cols-2"
    >
      {investments.map((investment) => (
        <Card key={investment.id}>
          <CardHeader>
            <CardTitle>{investment.tranche.name}</CardTitle>
            <CardDescription className="underline">
              <Link href={`/dashboard/investments/${investment.id}`}>
                View Details
              </Link>
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="flex justify-between items-center">
              <Badge className={getStatusColor(investment.status)}>
                {investment.status}
              </Badge>
              <p className="text-sm text-muted-foreground">
                {investment._count.transactions} transactions
              </p>
            </div>
            <p className="mt-2 font-semibold">
              Amount: {formatCurrency(investment.tranche.fee)}
            </p>
          </CardContent>
        </Card>
      ))}
    </TabsContent>
  );
};

export default InvestmentsTab;
