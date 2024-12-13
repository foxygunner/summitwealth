import { differenceInDays } from "date-fns";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { InvestmentDetailPayload } from "@/lib/validations/investment";
import { formatCurrency } from "@/lib/utils";
import { getInvestmentReward } from "@/lib/utils/investment";
import StatsCard from "./stats-card";

type StatsContainerParams = { investmentData: InvestmentDetailPayload };

const StatsContainer = ({ investmentData }: StatsContainerParams) => {
  const {
    tranche: { fee, dailyProfitIncrease },
    started,
    ended,
    lastClaimed,
    transactions,
  } = investmentData;

  const totalEarnings = started
    ? getInvestmentReward({
        multiplier: dailyProfitIncrease,
        noOfDaysStaked: differenceInDays(ended ?? new Date(), started),
        stakeAmount: fee,
      })
    : 0;
  const unclaimedDays =
    started && !ended
      ? differenceInDays(new Date(), lastClaimed ?? started)
      : 0;
  const unclaimedEarnings = getInvestmentReward({
    multiplier: dailyProfitIncrease,
    noOfDaysStaked: unclaimedDays,
    stakeAmount: fee,
  });
  const paidFees = transactions.find(
    (tx) => tx.status === "CONFIRMED" && tx.type === "DEPOSIT"
  );

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
      <StatsCard
        title="Total Earnings"
        value={`${formatCurrency(totalEarnings)}`}
      />
      <StatsCard
        title="Total Value Locked"
        value={`${formatCurrency(paidFees ? fee : 0)}`}
      />
      <StatsCard
        title="Claimed Earnings"
        value={`${formatCurrency(totalEarnings - unclaimedEarnings)}`}
      />
      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">
            Unclaimed Earnings
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">
            {formatCurrency(unclaimedEarnings)}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default StatsContainer;
