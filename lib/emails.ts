import { Resend } from "resend";

import { env } from "@/env.mjs";
import VerifyEmail from "@/components/emails/verify-email";
import ForgotPassword from "@/components/emails/forgot-password";

const from = env.NEXT_PUBLIC_RESEND_FROM_EMAIL;

const resend = new Resend(env.RESEND_API_KEY);

export const sendVerificationEmail = async (
  verificationUrl: string,
  to: string
) => {
  await resend.emails.send({
    from,
    to,
    subject: "Verify Your Email Address",
    react: VerifyEmail({ verificationUrl }),
  });
};

export const sendForgotPasswordEmail = async (
  verificationUrl: string,
  to: string
) => {
  await resend.emails.send({
    from,
    to,
    subject: "Reset Your Password",
    react: ForgotPassword({ verificationUrl }),
  });
};
