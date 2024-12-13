import { Suspense } from "react";

import {
  CardContainer,
  CardDescription,
  CardHeader,
  CardIcon,
  CardTitle,
} from "@/components/marketing/card";
import prisma from "@/lib/prisma";
import { CalculatorForm } from "./calculator-form";

export default async function Calculator() {
  const tranches = await prisma.tranche.findMany({
    orderBy: { fee: "asc" },
  });

  return (
    <div id="earnings-checker">
      <CardContainer>
        <CardHeader>
          <CardIcon icon="bot" />
          <CardTitle>Estimate Your Earnings</CardTitle>
          <CardDescription className="max-w-md">
            Select your plan, stake duration, and amount to
            <span className="text-foreground"> see potential returns.</span>
          </CardDescription>
        </CardHeader>

        <div className="mx-auto grid w-full max-w-xl gap-6">
          <Suspense fallback={null}>
            <CalculatorForm tranches={tranches} />
          </Suspense>
        </div>
      </CardContainer>
    </div>
  );
}
