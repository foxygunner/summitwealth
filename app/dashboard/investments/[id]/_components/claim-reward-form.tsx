"use client";

import { toast } from "sonner";
import Link from "next/link";
import { ExternalLink } from "lucide-react";

import { useState, useTransition } from "react";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { LoadingAnimation } from "@/components/loading-animation";
import { claimReward } from "@/actions/investments/claim-investment-reward";
import { formatCurrency } from "@/lib/utils";

interface ClaimRewardModalProps {
  currentWalletAddress: string;
  reward: number;
  investmentId: string;
  show: boolean;
}

export function ClaimRewardModal({
  currentWalletAddress,
  investmentId,
  reward,
  show,
}: ClaimRewardModalProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [isAlertOpen, setIsAlertOpen] = useState(false);
  const [isPending, startTransition] = useTransition();

  const handleConfirm = () => {
    setIsAlertOpen(true);
  };

  const handleFinalConfirm = () => {
    startTransition(async () => {
      try {
        const { error, success } = await claimReward({ id: investmentId });
        if (success) {
          toast.success(
            "Your investment plan will is terminated, and you will receive your balance in less than 2 hours.",
            {}
          );
        } else {
          toast.error(error);
        }

        setIsAlertOpen(false);
        setIsOpen(false);
      } catch (error) {
        console.log(error);
        toast.error("Network Error");
      }
    });
  };

  if (!show) {
    return null;
  }

  return (
    <>
      <Dialog open={isOpen} onOpenChange={setIsOpen}>
        <DialogTrigger asChild>
          <Button>Claim Investment Reward</Button>
        </DialogTrigger>
        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle>Claim Investment Reward</DialogTitle>
            <DialogDescription>
              Please confirm your wallet address to receive your investment
              reward.
            </DialogDescription>
          </DialogHeader>
          <div className="grid gap-4 py-4">
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="wallet-address" className="text-right">
                Wallet Address
              </Label>
              <Input
                id="wallet-address"
                value={currentWalletAddress}
                disabled
                className="col-span-3"
              />
            </div>

            <div className="flex items-center gap-2">
              <ExternalLink className="h-4 w-4" />
              <Link
                href={"/dashboard/settings/account"}
                className="h-auto p-0 underline hover:no-underline"
              >
                Update wallet address in account settings
              </Link>
            </div>
            <div className="text-sm text-muted-foreground">
              Reward Amount: {formatCurrency(reward)}
            </div>
          </div>
          <DialogFooter>
            <Button type="submit" onClick={handleConfirm}>
              Confirm Claim
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      <AlertDialog open={isAlertOpen} onOpenChange={setIsAlertOpen}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Confirm Reward Claim</AlertDialogTitle>
            <AlertDialogDescription>
              You are about to claim your investment reward of{" "}
              {formatCurrency(reward)}. The reward will be sent to the specified
              wallet address in less than 2 hours.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction onClick={handleFinalConfirm}>
              {isPending ? <LoadingAnimation /> : "Yes, claim my reward"}
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </>
  );
}
