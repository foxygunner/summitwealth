import { $Enums } from "@prisma/client";

export type GetUserStats = {
  noOftxs: number;
  txsValue: number;
  unclaimedRewards: number;
  totalRewards: number;
  referrals: number;
  investmentPlan?: string;
  walletaddress?: string | null;
  chartData: UserChartData;
};

export type TransactionType = "deposit" | "reward" | "withdrawal";

export type UserChartData = {
  transactionType: TransactionType;
  value: number;
  fill: `var(--color-${TransactionType})`;
}[];

export const defaultChartData: UserChartData = [
  { transactionType: "deposit", value: 0, fill: "var(--color-deposit)" },
  {
    transactionType: "withdrawal",
    value: 0,
    fill: "var(--color-withdrawal)",
  },
  { transactionType: "reward", value: 0, fill: "var(--color-reward)" },
];

export const defaultUserStats: GetUserStats = {
  noOftxs: 0,
  txsValue: 0,
  referrals: 0,
  totalRewards: 0,
  unclaimedRewards: 0,
  chartData: defaultChartData,
};

export const getTxType = (
  txDbType: $Enums.TransactionType
): TransactionType => {
  switch (txDbType) {
    case "CLAIM_REWARD":
      return "reward";
    case "DEPOSIT":
      return "deposit";
    case "WITHDRAWAL":
      return "withdrawal";

    default:
      return "withdrawal";
  }
};
