import { CheckCircle, AlertCircle, XCircle } from "lucide-react";

import { $Enums } from "@prisma/client";

export const getStatusIcon = (status: $Enums.TransactionStatus) => {
  switch (status) {
    case "CONFIRMED":
      return <CheckCircle className="h-4 w-4 text-success-foreground" />;
    case "PENDING":
      return <AlertCircle className="h-4 w-4 text-warning-foreground" />;
    case "FAILED":
      return <XCircle className="h-4 w-4 text-destructive-foreground" />;
    default:
      return null;
  }
};

export const getStatusColor = (status: $Enums.TransactionStatus) => {
  switch (status) {
    case "CONFIRMED":
      return "bg-success text-success-foreground";
    case "PENDING":
      return "bg-warning text-warning-foreground";
    case "FAILED":
      return "bg-destructive text-destructive-foreground";
    default:
      return "bg-gray-100 text-gray-800";
  }
};

export const getTransactionType = (type: $Enums.TransactionType) => {
  switch (type) {
    case "CLAIM_REWARD":
      return "Earnings Claim";
    case "DEPOSIT":
      return "Deposit";
    case "WITHDRAWAL":
      return "Withdrawal";
    default:
      return "";
  }
};
