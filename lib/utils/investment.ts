type GetInvestmentRewardParam = {
  stakeAmount: number;
  noOfDaysStaked: number;
  multiplier: number;
  referralCount?: number;
};

// change referral count to referrals with confirmed investment

export const getInvestmentReward = ({
  multiplier,
  noOfDaysStaked,
  stakeAmount,
  referralCount,
}: GetInvestmentRewardParam) => {
  const multiplierPercent = multiplier / 100;
  const referralMultiplier = !!referralCount ? referralCount : 1;
  return multiplierPercent * noOfDaysStaked * stakeAmount * referralMultiplier;
};
