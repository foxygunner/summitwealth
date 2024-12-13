import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { TransactionTable } from "@/app/dashboard/transactions/_components/transaction-table";
import { InvestmentDetailPayload } from "@/lib/validations/investment";

type InvestmentTransactionsParams = { investmentData: InvestmentDetailPayload };
const InvestmentTransactions = ({
  investmentData,
}: InvestmentTransactionsParams) => {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Recent Transactions</CardTitle>
      </CardHeader>
      <CardContent>
        <TransactionTable data={investmentData.transactions} />
      </CardContent>
    </Card>
  );
};

export default InvestmentTransactions;
