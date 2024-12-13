"use server";

import { headers } from "next/headers";
import { revalidatePath } from "next/cache";

import { auth } from "@/lib/auth";
import prisma from "@/lib/prisma";
import { updateWalletFormSchema } from "@/lib/validations/auth";

export const updateWallet = async (params: unknown) => {
  const validatedFields = updateWalletFormSchema.safeParse(params);

  if (!validatedFields.success) {
    return { error: "Invalid params!" };
  }

  const { walletAddress: evmwalletAddress } = validatedFields.data;

  try {
    // ensure user is logged in
    const session = await auth.api.getSession({
      headers: headers(), // you need to pass the headers object.
    });
    if (!session) {
      return { error: "Unauthenticated" };
    }

    const updatedUser = await prisma.user.update({
      where: { id: session.user.id },
      data: { evmwalletAddress },
    });

    revalidatePath("/", "layout");

    return {
      success: `Wallet address updated successfully: ${updatedUser.evmwalletAddress}`,
    };
  } catch (error) {
    console.error("UPDATE_USER", error);
    return { error: "Server Error" };
  }
};
