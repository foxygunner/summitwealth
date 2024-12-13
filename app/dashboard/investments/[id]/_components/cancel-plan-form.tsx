"use client";

import { toast } from "sonner";
import { useState, useTransition } from "react";

import { Button } from "@/components/ui/button";
import {
  Credenza,
  CredenzaBody,
  CredenzaClose,
  CredenzaContent,
  CredenzaDescription,
  CredenzaFooter,
  CredenzaTrigger,
  CredenzaHeader,
  CredenzaTitle,
} from "@/components/ui/credenza";
import { cancelInvestment } from "@/actions/investments/cancel-investment";
import { LoadingAnimation } from "@/components/loading-animation";

type CancelPlanFormProps = { investmentId: string };

const CancelPlanForm = ({ investmentId: id }: CancelPlanFormProps) => {
  const [open, setOpen] = useState(false);
  const [isPending, startTransition] = useTransition();

  const onSubmit = () => {
    startTransition(async () => {
      try {
        const { error, success } = await cancelInvestment({ id });
        startTransition(() => {
          console.log({ error, success });
          if (error) {
            toast.error(error);
            return;
          }
          if (success) {
            toast.success(`Investment was successfully cancelled`);
          }
        });
      } catch (error) {
        console.error(error);
        toast.error("Network error");
      }
    });
  };

  return (
    <Credenza open={open} onOpenChange={setOpen}>
      <CredenzaTrigger asChild>
        <Button variant="destructive">Cancel Plan</Button>
      </CredenzaTrigger>
      <CredenzaContent className="sm:max-w-[425px]">
        <CredenzaHeader>
          <CredenzaTitle>Confirm Cancellation</CredenzaTitle>
          <CredenzaDescription>
            Warning: This action cannot be undone. If you cancel now, you'll
            lose all progress on this investment plan. Are you sure you want to
            proceed?
          </CredenzaDescription>
        </CredenzaHeader>
        <CredenzaBody>
          <Button variant="destructive" onClick={onSubmit} disabled={isPending}>
            {isPending ? <LoadingAnimation /> : "Cancel Plan"}
          </Button>
        </CredenzaBody>
        <CredenzaFooter>
          <CredenzaClose asChild>
            <button>Close</button>
          </CredenzaClose>
        </CredenzaFooter>
      </CredenzaContent>
    </Credenza>
  );
};

export default CancelPlanForm;
