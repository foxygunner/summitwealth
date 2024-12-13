import { notFound, redirect } from "next/navigation";

import prisma from "@/lib/prisma";
import { confirmTransaction } from "@/actions/transactions/confirm-transaction";

type DepositSuccessPage = { params: { txId: string } };

const DepositSuccessPage = async ({ params: { txId } }: DepositSuccessPage) => {
  // get transaction
  const transaction = await prisma.transaction.findUnique({
    where: { id: txId },
  });

  // throw error / not found if no tx
  if (!transaction?.txId) {
    notFound();
  }

  // send inngest confirm tx without waiting
  await confirmTransaction(transaction.txId);

  // redirect to tx investment page
  return redirect(`/dashboard/investments/${transaction.investmentId}`);
};

export default DepositSuccessPage;
