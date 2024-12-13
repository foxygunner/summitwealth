"use client";

import { useFormStatus } from "react-dom";
import { toast } from "sonner";

import { LoadingAnimation } from "@/components/loading-animation";
import { forgetPassword } from "@/lib/auth/client";
import { Label } from "../ui/label";
import { Input } from "../ui/input";
import { Button } from "../ui/button";

export default function RequestTokenForm() {
  const { pending } = useFormStatus();

  return (
    <form
      action={async (formData) => {
        try {
          const email = formData.get("email") as string;

          await forgetPassword({
            email,
            redirectTo: "/forgot-password",
            fetchOptions: {
              onSuccess: () => {
                toast.success("Password reset link has been sent to your mail");
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
        <Label htmlFor="email">Email</Label>
        <Input id="email" name="email" type="email" required />
      </div>
      <Button variant="secondary" className="w-full" type="submit">
        {pending ? <LoadingAnimation /> : "Reset Password"}
      </Button>
    </form>
  );
}
