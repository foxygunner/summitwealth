"use server";

import { revalidatePath } from "next/cache";

import { inngest } from "@/inngest/client";

export const confirmTransaction = async (invoiceId: string) => {
  try {
    await inngest.send({
      name: "investment/payment.confirm",
      data: {
        invoiceId,
      },
    });
    revalidatePath("/", "layout");
  } catch (error) {
    console.log("CONFIRM_TRANSACTION", error);
  }
};
