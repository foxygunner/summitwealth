import { Metadata } from "next";
import { Suspense } from "react";

import { UserAuthForm } from "@/components/auth/user-auth-form";

export const metadata: Metadata = {
  title: "Login",
  description: "Login to your account",
};

export default function LoginPage() {
  return (
    <Suspense>
      <UserAuthForm />
    </Suspense>
  );
}
