"use server";

import { headers } from "next/headers";
import { AxiosResponse } from "axios";
import { revalidatePath } from "next/cache";

import { auth } from "@/lib/auth";
import prisma from "@/lib/prisma";
import { investmentCreateSchema } from "@/lib/validations/investment";
import nowPaymentClient, { config } from "@/lib/now-client";
import { siteConfig } from "@/config/site";
import { NowInvoiceResponse } from "@/lib/validations/transaction";
import { inngest } from "@/inngest/client";

export const createInvestment = async (params: unknown) => {
  const validatedFields = investmentCreateSchema.safeParse(params);

  if (!validatedFields.success) {
    return { error: "Invalid params!" };
  }

  const { trancheId } = validatedFields.data;

  try {
    // ensure user is logged in
    const session = await auth.api.getSession({
      headers: headers(), // you need to pass the headers object.
    });
    if (!session) {
      return { error: "Unauthenticated" };
    }

    const { id: userId } = session.user;

    // ensure there is no active or pending investment (let them cancel pending or end active first)
    const activeInvestment = await prisma.investment.findFirst({
      where: { userId, ended: null, status: { not: "CANCELLED" } },
    });

    if (activeInvestment) {
      return { error: "Please cancel pending or end active investments" };
    }

    // ensure tranche is available
    const investmentTranche = await prisma.tranche.findUnique({
      where: { id: trancheId },
    });
    if (!investmentTranche) {
      return { error: "Invalid Tranche" };
    }

    // check api link
    const apiStatusResponse: AxiosResponse<{ message: string }> =
      await nowPaymentClient.get("/status");
    if (apiStatusResponse.data.message !== "OK") {
      return { error: "Payment provider error" };
    }

    // create pending investment
    const investment = await prisma.investment.create({
      data: { dailyProfit: 0, status: "PENDING", trancheId, userId },
    });

    // create and connect "DEPOSIT" tx type to investment
    const { amount, id: createdTxId } = await prisma.transaction.create({
      data: {
        amount: investmentTranche.fee,
        type: "DEPOSIT",
        investmentId: investment.id,
        status: "PENDING",
      },
    });

    // create payment link
    const data = {
      price_amount: amount,
      price_currency: "usd",
      order_id: createdTxId,
      order_description: `Invest in ${siteConfig.name} ${investmentTranche.name} Tranche`,
      ipn_callback_url: `${siteConfig.url}/api/deposits/${createdTxId}/callback`,
      success_url: `${siteConfig.url}/deposits/${createdTxId}/success`,
      cancel_url: `${siteConfig.url}/deposits/${createdTxId}/cancel`,
    };
    const paymentResponse: NowInvoiceResponse = await nowPaymentClient.post(
      "/invoice",
      data,
      config
    );

    //  connect pending transaction
    const updatedTx = await prisma.transaction.update({
      where: { id: String(createdTxId) },
      data: { txId: paymentResponse.data.id },
    });

    //TODO send chect payment task after 20 minutes to validate tx
    await inngest.send({
      name: "investment/payment.confirm",
      data: {
        invoiceId: updatedTx.txId ?? paymentResponse.data.id,
        wait: "20 mins",
      },
    });

    // send payment url to frontend
    revalidatePath("/", "layout");
    console.log({ response: paymentResponse.data.invoice_url });
    return { success: paymentResponse.data.invoice_url };
  } catch (error) {
    console.error("CREATE_INVESTMENT", error);
    return { error: "Server Error" };
  }
};
