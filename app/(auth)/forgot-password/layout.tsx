import Link from "next/link";

import { Shell } from "@/components/dashboard/shell";
import { Separator } from "@/components/ui/separator";

interface AuthLayoutProps {
  children: React.ReactNode;
}

export default function ForgotPasswordLayout({ children }: AuthLayoutProps) {
  return (
    <Shell className="my-4 grid w-full max-w-xl gap-6 md:p-10">
      <div className="flex flex-col gap-2 text-center">
        <h1 className="font-semibold text-3xl tracking-tight">
          Reset Password
        </h1>
        <p className="text-muted-foreground text-sm">
          Enter your email / new password for your account.
        </p>
      </div>
      <div className="grid gap-3">
        {children}
        <Separator />
      </div>
      <p className="px-8 text-center text-muted-foreground text-sm">
        By clicking continue, you agree to our{" "}
        <Link
          href="/legal/terms"
          className="underline underline-offset-4 hover:text-primary hover:no-underline"
        >
          Terms of Service
        </Link>{" "}
        and{" "}
        <Link
          href="/legal/privacy"
          className="underline underline-offset-4 hover:text-primary hover:no-underline"
        >
          Privacy Policy
        </Link>
        .
      </p>
    </Shell>
  );
}
