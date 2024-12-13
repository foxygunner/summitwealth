"use client";

import { useRouter } from "next/navigation";
import { useState, useTransition } from "react";
import { toast } from "sonner";
import Link from "next/link";

import { createInvestment } from "@/actions/investments/create-investment";
import { Button } from "@/components/ui/button";
import { LoadingAnimation } from "@/components/loading-animation";

export function InvestForm({ trancheId }: { trancheId: string }) {
  const [isPending, startTransition] = useTransition();
  const [paymentLink, setPaymentLink] = useState<string | null>(null);
  const router = useRouter();

  const onSubmit = async () => {
    startTransition(async () => {
      try {
        const { error, success } = await createInvestment({ trancheId });
        startTransition(() => {
          console.log({ error, success });
          if (!!error) {
            toast.error(error);
          }
          if (!!success) {
            toast.success(
              `Payment link generated successfully. Link: ${success}`
            );
            setPaymentLink(success);
            router.replace(success);
          }
        });
      } catch (error) {
        console.error(error);
        toast.error("Network error");
      }
    });
  };

  if (paymentLink) {
    return (
      <Button className="w-full" asChild>
        <Link href={paymentLink} target="_blank">
          Make Payment
        </Link>
      </Button>
    );
  }

  return (
    <Button
      className="w-full"
      type="submit"
      onClick={onSubmit}
      disabled={isPending}
    >
      {isPending ? <LoadingAnimation /> : "Invest Now"}
    </Button>
  );
}
