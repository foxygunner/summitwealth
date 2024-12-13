import Image from "next/image";
import Link from "next/link";

import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { Squirrel } from "lucide-react";

export default function NoTransactionsCard({
  className,
}: React.HTMLAttributes<HTMLDivElement>) {
  return (
    <Card className={cn("w-full max-w-md mx-auto", className)}>
      <CardContent className="pt-6 px-6 pb-4 flex flex-col items-center">
        <div className="relative w-32 h-32 mb-6">
          <Squirrel className="w-full h-full text-muted-foreground" />
        </div>
        <h3 className="text-2xl font-semibold text-center mb-2">
          No transactions yet
        </h3>
        <p className="text-muted-foreground text-center mb-4">
          When you make a transaction, it will appear here.
        </p>
      </CardContent>
      <CardFooter className="flex justify-center pb-6">
        <Button asChild>
          <Link href={"/dashboard/plans"}>Start Investing</Link>
        </Button>
      </CardFooter>
    </Card>
  );
}
