import { inngest } from "@/inngest/client";
import prisma from "@/lib/prisma";

export const endInvestmentEvent = inngest.createFunction(
  { id: "end-investment-plan" },
  { event: "investment/plan.end" },
  async ({ event, step }) => {
    const { investmentId } = event.data;

    // get pending WITHDRAWAL tx for investmentId
    const pendingTx = await step.run("get-pending-transaction", async () => {
      return prisma.transaction.findFirst({
        where: {
          investmentId,
          status: "PENDING",
          txId: null,
          type: "WITHDRAWAL",
        },
      });
    });

    if (!pendingTx) {
      return { message: "Invalid Transaction" };
    }

    // update tx to CONFIRMED
    const confirmedTx = await step.run(
      "confirm-withdrawal-transaction",
      async () => {
        return prisma.transaction.update({
          where: { id: pendingTx.id },
          data: { status: "CONFIRMED" },
        });
      }
    );

    // send payment tr
    const txId = await step.run("send-payment-get-txId", async () => {
      return new Date().toString();
    });

    //update txId
    const txWithId = await step.run("update-transaction-txId", async () => {
      return prisma.transaction.update({
        where: { id: confirmedTx.id },
        data: { txId },
        select: {
          investment: {
            select: {
              user: {
                select: { email: true, name: true, evmwalletAddress: true },
              },
              tranche: { select: { name: true } },
            },
          },
          amount: true,
        },
      });
    });

    const { email, evmwalletAddress, name } = txWithId.investment.user;

    const message = `<b>Investment Plan Termination Request</b>

<b>User Details:</b>
<b>Name:</b> ${name}
<b>Email:</b> ${email}

<b>Investment Details:</b>
<b>Plan Name:</b> ${txWithId.investment.tranche.name}
<b>Total Amount to Transfer:</b> ${txWithId.amount} USD

<b>Wallet Details:</b>
<b>Wallet Address:</b> ${evmwalletAddress}

<b>Confirmation:</b>
The user has confirmed the wallet address for receiving the payment.

Please proceed with the token transfer to the provided wallet address. Thank you!
`;

    // send TG Message (alert admin)
    await step.sendEvent("send-end-investment-notification", {
      name: "notifications/telegram.send",
      data: { message, type: "DEV_MODE" },
    });

    // send user mail

    // return
    return { message: `Investment: ${pendingTx.investmentId} done!!!` };
  }
);
