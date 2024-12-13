"use client";

import Link from "next/link";

import type { ButtonProps } from "@/components/ui/button";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { useSession } from "@/lib/auth/client";

export function LoginButton({ className, ...props }: ButtonProps) {
  const { data: session } = useSession();

  return (
    <Button asChild className={cn("rounded-full", className)} {...props}>
      {session ? (
        <Link href="/dashboard">Dashboard</Link>
      ) : (
        <Link href="/login">Sign In</Link>
      )}
    </Button>
  );
}
