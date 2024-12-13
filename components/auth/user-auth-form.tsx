"use client";

import Link from "next/link";
import * as React from "react";
import { usePathname, useRouter } from "next/navigation";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import * as z from "zod";
import { parseAsString, useQueryState } from "nuqs";
import { toast } from "sonner";
import { UserPlus } from "lucide-react";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { userAuthSchema } from "@/lib/validations/auth";
import { Input } from "@/components/ui/input";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { signIn, signUp } from "@/lib/auth/client";
import { LoadingAnimation } from "../loading-animation";
import { Alert, AlertTitle } from "../ui/alert";

type FormSchema = z.infer<typeof userAuthSchema>;

type UserAuthFormProps = {
  referrer?: { id: string; name: string } | null;
};

export function UserAuthForm({ referrer: ref }: UserAuthFormProps) {
  const pathname = usePathname();
  const [isPending, startTransition] = React.useTransition();
  const [callbackURL] = useQueryState(
    "callbackURL",
    parseAsString.withDefault("/dashboard/overview")
  );
  const router = useRouter();

  const isRegister = pathname === "/register";
  const buttonText = isRegister ? "Register" : "Login";

  const form = useForm<FormSchema>({
    resolver: zodResolver(userAuthSchema),
    defaultValues: { referredById: ref?.id ?? undefined },
  });

  function onSubmit(formData: FormSchema) {
    startTransition(async () => {
      try {
        const { email, password, name, referredById } = formData;
        if (isRegister) {
          if (!name || name.length < 3) {
            toast.error("Please enter your name");
            return form.setError("name", {
              message: "Name should be at least 3 characters",
            });
          }
          await signUp.email({
            email,
            password,
            name,
            referredById,
            callbackURL,
            fetchOptions: {
              onSuccess: () => {
                toast.success("Verification link has been sent to your mail");
                router.push(`/verification-sent?email=${email}`);
              },
              onError({ error }) {
                toast.error(error.message);
                console.error(error);
              },
            },
          });
        } else {
          await signIn.email({
            email,
            password,
            callbackURL,
            fetchOptions: {
              onSuccess: () => {
                toast.success("Logged In successfully");
                router.replace(callbackURL);
              },
              onError({ error }) {
                /* Whenever user tried to signin but email is not verified it catches the error and display the error */
                if (error.status === 403) {
                  toast.error("Please verify your email address");
                }
                toast.error(error.message);
                console.error(error);
              },
            },
          });
        }
      } catch (_e) {
        // TODO: better error handling, including e.g. toast
        console.error(_e);
        toast.error("Something went wrong");
        form.setError("root", { message: "Something went wrong" });
      }
    });
  }

  return (
    <Card className="mx-auto max-w-sm">
      <CardHeader>
        <CardTitle className="text-2xl">
          {isRegister ? "Register" : "Login"}
        </CardTitle>
        <CardDescription>
          {isRegister
            ? "Enter your details below to create your account"
            : "Enter your email below to login to your account"}
        </CardDescription>
      </CardHeader>
      <CardContent>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)}>
            <div className="grid gap-4">
              {isRegister && (
                <FormField
                  control={form.control}
                  name="name"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Name</FormLabel>
                      <FormControl>
                        <Input placeholder="John Doe" {...field} />
                      </FormControl>
                      <FormDescription>
                        This is your public display name.
                      </FormDescription>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              )}
              <FormField
                control={form.control}
                name="email"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Email</FormLabel>
                    <FormControl>
                      <Input
                        placeholder="doe@example.com"
                        type="email"
                        {...field}
                      />
                    </FormControl>

                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="password"
                render={({ field }) => (
                  <FormItem>
                    <div className="flex items-center">
                      <FormLabel>Password</FormLabel>{" "}
                      {!isRegister && (
                        <Link
                          href="/forgot-password"
                          className="ml-auto inline-block text-sm underline"
                        >
                          Forgot your password?
                        </Link>
                      )}
                    </div>
                    <FormControl>
                      <Input
                        placeholder="*********"
                        type="password"
                        {...field}
                      />
                    </FormControl>

                    <FormMessage />
                  </FormItem>
                )}
              />

              {ref && (
                <Alert className="mt-4">
                  <UserPlus className="h-4 w-4" />
                  <AlertTitle>You were invited by {ref.name}!</AlertTitle>
                </Alert>
              )}

              <Button disabled={isPending} type="submit" className="w-full">
                {isPending ? <LoadingAnimation /> : <>{buttonText} </>}
              </Button>
            </div>
            <div className="mt-4 text-center text-sm">
              {isRegister ? (
                <>
                  Already have an account?{" "}
                  <Link href="/login" className="underline">
                    Login
                  </Link>{" "}
                </>
              ) : (
                <>
                  Don&apos;t have an account?{" "}
                  <Link href="/register" className="underline">
                    Sign up
                  </Link>{" "}
                </>
              )}
            </div>
          </form>
        </Form>
      </CardContent>
    </Card>
  );
}
