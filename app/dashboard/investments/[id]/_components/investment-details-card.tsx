import Link from "next/link";
import { differenceInDays, formatDistanceToNow } from "date-fns";

import { Badge } from "@/components/ui/badge";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  getStatusColor,
  InvestmentDetailPayload,
} from "@/lib/validations/investment";
import { Button } from "@/components/ui/button";
import { getInvestmentReward } from "@/lib/utils/investment";
import { siteConfig } from "@/config/site";
import CancelPlanForm from "./cancel-plan-form";
import { EndPlanModal } from "./end-plan-form";
import { ClaimRewardModal } from "./claim-reward-form";
import WalletUpdateModal from "./wallet-update-modal";

type InvestmentDetailsCardParams = { investmentData: InvestmentDetailPayload };

const InvestmentDetailsCard = async ({
  investmentData,
}: InvestmentDetailsCardParams) => {
  const showPaymentTx = investmentData.transactions.find(
    (tx) => tx.status === "PENDING" && tx.type === "DEPOSIT"
  );

  const unclaimedDays =
    investmentData.started && !investmentData.ended
      ? differenceInDays(
          new Date(),
          investmentData.lastClaimed ?? investmentData.started
        )
      : 0;
  const unclaimedEarnings = getInvestmentReward({
    multiplier: investmentData.tranche.dailyProfitIncrease,
    noOfDaysStaked: unclaimedDays,
    stakeAmount: investmentData.tranche.fee,
  });

  const showEndButton = investmentData.started && !investmentData.ended;

  return (
    <Card>
      <CardHeader>
        <CardTitle>Investment Details</CardTitle>
      </CardHeader>
      <CardContent>
        <dl className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <dt className="font-medium">Tranche Name</dt>
            <dd>{investmentData.tranche.name}</dd>
          </div>
          <div>
            <dt className="font-medium">Status</dt>
            <dd>
              <Badge className={getStatusColor(investmentData.status)}>
                {investmentData.status}
              </Badge>
            </dd>
          </div>
          <div>
            <dt className="font-medium">Start Date</dt>
            <dd>
              {investmentData.started
                ? formatDistanceToNow(investmentData.started)
                : "N/A"}
            </dd>
          </div>
          <div>
            <dt className="font-medium">Last Claimed Date</dt>
            <dd>
              {investmentData.lastClaimed
                ? formatDistanceToNow(investmentData.lastClaimed)
                : "N/A"}
            </dd>
          </div>
          <div>
            <dt className="font-medium">End Date</dt>
            <dd>
              {investmentData.ended
                ? formatDistanceToNow(investmentData.ended)
                : "N/A"}
            </dd>
          </div>
        </dl>
      </CardContent>
      <CardFooter className="flex gap-4">
        {showPaymentTx && (
          <>
            <Button asChild>
              <Link
                href={`https://nowpayments.io/payment/?iid=${showPaymentTx.txId}`}
                target="_blank"
              >
                Make Payment
              </Link>
            </Button>
            <CancelPlanForm investmentId={showPaymentTx.investmentId} />
          </>
        )}

        {!investmentData.user?.evmwalletAddress ? (
          <WalletUpdateModal />
        ) : showEndButton ? (
          <>
            <EndPlanModal
              currentWalletAddress={investmentData.user.evmwalletAddress}
              investmentId={investmentData.id}
            />
            <ClaimRewardModal
              show={unclaimedEarnings >= siteConfig.minClaimmableReward}
              currentWalletAddress={investmentData.user.evmwalletAddress}
              investmentId={investmentData.id}
              reward={unclaimedEarnings}
            />
          </>
        ) : null}
      </CardFooter>
    </Card>
  );
};

export default InvestmentDetailsCard;
