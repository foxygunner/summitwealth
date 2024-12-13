import * as z from "zod";
import { isAddress } from "ethers";

export const userAuthSchema = z.object({
  email: z.string().email(),
  password: z.string().min(8).max(32),
  name: z.string().min(3).optional(),
  referredById: z.string().min(8).optional(),
  image: z.string().url().optional(),
});

export const updateWalletFormSchema = z.object({
  walletAddress: z
    .string()
    .min(1, "Wallet address is required")
    .refine((address) => isAddress(address), {
      message: "Invalid EVM wallet address",
    }),
});
