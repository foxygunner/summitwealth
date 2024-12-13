import { confirmTransaction } from "@/actions/transactions/confirm-transaction";
import prisma from "@/lib/prisma";

export async function POST(
  request: Request,
  { params: { txId } }: { params: { txId: string } }
) {
  try {
    // get transaction
    const transaction = await prisma.transaction.findUnique({
      where: { id: txId },
    });

    // throw error / not found if no tx
    if (!transaction?.txId) {
      return new Response(`Invalid Transaction`, {
        status: 400,
      });
    }

    // send inngest confirm tx without waiting
    await confirmTransaction(transaction.txId);
  } catch (error) {
    return new Response(`Webhook error`, {
      status: 400,
    });
  }
  // return success
  return new Response("Success!", {
    status: 200,
  });
}
