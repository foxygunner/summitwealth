import { createEnv } from "@t3-oss/env-nextjs";
import { z } from "zod";

export const env = createEnv({
  server: {
    DATABASE_URL: z.string().url(),
    BETTER_AUTH_URL: z.string().url(),
    BETTER_AUTH_SECRET: z.string().min(1),
    CMC_PRO_API_KEY: z.string().min(1),
    RESEND_API_KEY: z.string().min(1),
    NOW_PAYMENT_API_KEY: z.string().min(1),
    NOW_PASSWORD: z.string().min(1),
    NOW_IPN_SECRET_KEY: z.string().min(1),
    TELEGRAM_BOT_TOKEN: z.string().min(1),
    TELEGRAM_PUBLIC_CHANNEL: z.string().min(1),
    TELEGRAM_PRIVATE_CHANNEL: z.string().min(1),
    NOW_EMAIL: z.string().email(),
    NODE_ENV: z.enum(["development", "production", "test"]),
  },
  client: {
    NEXT_PUBLIC_APP_URL: z.string().url(),
    NEXT_PUBLIC_RESEND_FROM_EMAIL: z.string().email(),
  },
  runtimeEnv: {
    DATABASE_URL: process.env.DATABASE_URL,
    BETTER_AUTH_SECRET: process.env.BETTER_AUTH_SECRET,
    BETTER_AUTH_URL: process.env.BETTER_AUTH_URL,
    CMC_PRO_API_KEY: process.env.CMC_PRO_API_KEY,
    RESEND_API_KEY: process.env.RESEND_API_KEY,
    NOW_PAYMENT_API_KEY: process.env.NOW_PAYMENT_API_KEY,
    NOW_EMAIL: process.env.NOW_EMAIL,
    NOW_PASSWORD: process.env.NOW_PASSWORD,
    NOW_IPN_SECRET_KEY: process.env.NOW_IPN_SECRET_KEY,
    TELEGRAM_BOT_TOKEN: process.env.TELEGRAM_BOT_TOKEN,
    TELEGRAM_PUBLIC_CHANNEL: process.env.TELEGRAM_PUBLIC_CHANNEL,
    TELEGRAM_PRIVATE_CHANNEL: process.env.TELEGRAM_PRIVATE_CHANNEL,
    NODE_ENV: process.env.NODE_ENV,
    NEXT_PUBLIC_APP_URL: process.env.NEXT_PUBLIC_APP_URL,
    NEXT_PUBLIC_RESEND_FROM_EMAIL: process.env.NEXT_PUBLIC_RESEND_FROM_EMAIL,
  },
});
