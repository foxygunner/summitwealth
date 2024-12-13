"use client";

import { useFormStatus } from "react-dom";
import { toast } from "sonner";
import { useRouter } from "next/navigation";

import { LoadingAnimation } from "@/components/loading-animation";
import { resetPassword } from "@/lib/auth/client";
import { Label } from "../ui/label";
import { Input } from "../ui/input";
import { Button } from "../ui/button";

export default function NewPasswordForm() {
  const { pending } = useFormStatus();
  const router = useRouter();

  return (
    <form
      action={async (formData) => {
        try {
          const newPassword = formData.get("newPassword") as string;

          await resetPassword({
            newPassword,
            fetchOptions: {
              onSuccess: () => {
                toast.success("Password was reset successfully");
                router.replace("/dashboard");
              },
              onError({ error }) {
                toast.error(error.message);
                console.error(error);
              },
            },
          });
        } catch (_e) {
          console.error(_e);
          toast.error("Server Error");
        }
      }}
      className="grid gap-2"
    >
      <div className="grid gap-1.5">
        <Label htmlFor="newPassword">New Password</Label>
        <Input
          id="newPassword"
          name="newPassword"
          type="text"
          required
          minLength={8}
          maxLength={32}
        />
      </div>
      <Button variant="secondary" className="w-full" type="submit">
        {pending ? <LoadingAnimation /> : "Reset Password"}
      </Button>
    </form>
  );
}
