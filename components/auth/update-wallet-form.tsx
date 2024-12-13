"use client";

import { toast } from "sonner";
import { useState, useTransition } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import * as z from "zod";

import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { updateWalletFormSchema } from "@/lib/validations/auth";
import { updateWallet } from "@/actions/auth/update-wallet";
import { Input } from "@/components/ui/input";
import { Button } from "../ui/button";
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
} from "../ui/credenza";
import { LoadingAnimation } from "../loading-animation";

type UpdateWalletFormProps = { walletAddress?: string };

const UpdateWalletForm = ({ walletAddress }: UpdateWalletFormProps) => {
  const [open, setOpen] = useState(false);
  const [isPending, startTransition] = useTransition();

  const form = useForm<z.infer<typeof updateWalletFormSchema>>({
    resolver: zodResolver(updateWalletFormSchema),
    defaultValues: {
      walletAddress,
    },
  });

  function onSubmit(values: z.infer<typeof updateWalletFormSchema>) {
    // Here you would typically send the new wallet address to your backend
    startTransition(async () => {
      try {
        console.log(values);
        const { error, success } = await updateWallet(values);
        if (success) {
          toast.success("Wallet address updated", {
            description: `New address: ${values.walletAddress}`,
          });
        } else {
          toast.error(error);
        }

        setOpen(false);
      } catch (error) {
        console.log(error);
        toast.error("Network Error");
      }
    });
  }

  return (
    <Credenza open={open} onOpenChange={setOpen}>
      <CredenzaTrigger asChild>
        <Button>Update wallet</Button>
      </CredenzaTrigger>
      <CredenzaContent className="sm:max-w-[425px]">
        <CredenzaHeader>
          <CredenzaTitle>Update Wallet address</CredenzaTitle>
          <CredenzaDescription>
            Enter your new EVM-compatible wallet address below.
          </CredenzaDescription>
        </CredenzaHeader>
        <CredenzaBody>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
              <FormField
                control={form.control}
                name="walletAddress"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Wallet Address</FormLabel>
                    <FormControl>
                      <Input placeholder="0x..." {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <Button type="submit" disabled={isPending}>
                {isPending ? <LoadingAnimation /> : "Update Wallet"}
              </Button>
            </form>
          </Form>
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

export default UpdateWalletForm;
