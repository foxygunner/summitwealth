import ResetPasswordError from "@/components/auth/reset-password-error";
import NewPasswordForm from "@/components/auth/new-password-form";
import RequestTokenForm from "@/components/auth/request-token-form";

import { searchParamsCache } from "../search-params";

export const metadata = {
  title: "Forgot Password?",
  description: "Reset your password to continue.",
};

export default function RegisterPage({
  searchParams,
}: {
  searchParams: { [key: string]: string | string[] | undefined };
}) {
  const { error, token } = searchParamsCache.parse(searchParams);

  // if error present error form
  if (error) {
    return <ResetPasswordError />;
  }

  // if token present reset password form
  if (token) {
    return <NewPasswordForm />;
  }

  // no error || no token present email form to request password token

  return <RequestTokenForm />;
}
