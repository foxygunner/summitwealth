import { inngest } from "@/inngest/client";
import prisma from "@/lib/prisma";

export const claimInvestmentEvent = inngest.createFunction(
  { id: "claim-investment-plan-reward" },
  { event: "investment/plan.claim" },
  async ({ event, step }) => {
    const { withdrawTxId } = event.data;

    // get pending CLAIM_REWARD tx with withrawId
    const pendingTx = await step.run(
      "get-pending-claim-transaction",
      async () => {
        return prisma.transaction.findUnique({
          where: {
            id: withdrawTxId,
            status: "PENDING",
            txId: null,
            type: "CLAIM_REWARD",
          },
        });
      }
    );

    if (!pendingTx) {
      return { message: "Invalid Transaction" };
    }

    // update tx to CONFIRMED
    const confirmedTx = await step.run(
      "confirm-claim-transaction",
      async () => {
        return prisma.transaction.update({
          where: { id: pendingTx.id },
          data: { status: "CONFIRMED" },
        });
      }
    );

    // send payment tr
    const txId = await step.run("send-claim-payment-get-txId", async () => {
      return new Date().toString();
    });

    //update txId
    const txWithId = await step.run(
      "update-claim-transaction-txId",
      async () => {
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
      }
    );

    const { email, evmwalletAddress, name } = txWithId.investment.user;

    const message = `<b>Reward Claim Request</b>

<b>User Details:</b>
<b>Name:</b> ${name}
<b>Email:</b> ${email}

<b>Investment Details:</b>
<b>Plan Name:</b> ${txWithId.investment.tranche.name}
<b>Accrued Interest:</b> ${txWithId.amount} USD

<b>Wallet Details:</b>
<b>Wallet Address:</b> ${evmwalletAddress}

The user has requested to claim their accrued interest. Please proceed with the reward transfer to the provided wallet address. Thank you!
`;

    // send TG Message (alert admin)
    await step.sendEvent("send-claim-investment-notification", {
      name: "notifications/telegram.send",
      data: { message, type: "DEV_MODE" },
    });

    // send user mail

    // return
    return { message: `Investment: ${pendingTx.investmentId} done!!!` };
  }
);
