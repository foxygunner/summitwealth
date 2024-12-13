import { Mail, AlertCircle } from "lucide-react";
import { redirect } from "next/navigation";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { verifParamsCache } from "../search-params";

export default function VerificationLinkPage({
  searchParams,
}: {
  searchParams: { [key: string]: string | string[] | undefined };
}) {
  const { email } = verifParamsCache.parse(searchParams);

  if (!email) {
    redirect("/login");
  }

  return (
    <Card className="w-full max-w-md mx-auto">
      <CardHeader>
        <CardTitle className="text-2xl font-bold text-center">
          Check Your Email
        </CardTitle>
      </CardHeader>
      <CardContent className="text-center space-y-4">
        <Mail className="w-16 h-16 mx-auto text-primary" />
        <p className="text-lg">
          We've sent a verification link to:
          <br />
          <strong>{email}</strong>
        </p>
        <p className="text-sm text-muted-foreground">
          Please check your email and click on the link to verify your account.
        </p>
        <div className="flex items-center justify-center space-x-2 text-sm text-muted-foreground">
          <AlertCircle className="w-4 h-4" />
          <p>The link will expire in 24 hours.</p>
        </div>
      </CardContent>
    </Card>
  );
}
