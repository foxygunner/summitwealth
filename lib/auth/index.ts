import { betterAuth } from "better-auth";
import { prismaAdapter } from "better-auth/adapters/prisma";
import { nextCookies } from "better-auth/next-js";

import { inngest } from "@/inngest/client";
import prisma from "../prisma";
import { sendForgotPasswordEmail, sendVerificationEmail } from "../emails";

export const auth = betterAuth({
  database: prismaAdapter(prisma, {
    provider: "postgresql", // or "mysql", "postgresql", ...etc
  }),
  advanced: {
    generateId: false,
  },
  user: {
    additionalFields: {
      referredById: {
        type: "string",
        required: false,
        input: true, // allow user to set referredById
      },
    },
  },
  emailAndPassword: {
    enabled: true,
    autoSignIn: true,
    requireEmailVerification: true,
    sendResetPassword: async ({ user, url }) => {
      await sendForgotPasswordEmail(url, user.email);
    },
  },
  plugins: [nextCookies()], // make sure this is the last plugin in the array
  emailVerification: {
    sendOnSignUp: true, // Automatically sends a verification email at signup
    autoSignInAfterVerification: true, // Automatically signIn the user after verification
    sendVerificationEmail: async ({ user, url }) => {
      await sendVerificationEmail(url, user.email);
    },
  },
  databaseHooks: {
    user: {
      create: {
        after: async (user) => {
          // send user created event
          await inngest.send({
            name: "auth/user.created",
            data: {
              userId: user.id,
            },
          });
        },
      },
    },
  },
});

export type Session = typeof auth.$Infer.Session;
