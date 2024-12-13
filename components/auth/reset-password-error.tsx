import React from "react";
import { AlertTriangle } from "lucide-react";

import { Alert, AlertDescription, AlertTitle } from "../ui/alert";
import { Separator } from "../ui/separator";
import { LinkCards } from "./link-cards";

const ResetPasswordError = () => {
  return (
    <div className="mx-auto flex h-full max-w-xl flex-1 flex-col items-center justify-center gap-4">
      <Alert variant="destructive">
        <AlertTriangle className="h-4 w-4" />
        <AlertTitle>Something went wrong</AlertTitle>
        <AlertDescription>The password reset token is invalid</AlertDescription>
      </Alert>
      <Separator className="my-4" />
      <p className="text-muted-foreground">Quick Links</p>
      <LinkCards />
    </div>
  );
};

export default ResetPasswordError;
