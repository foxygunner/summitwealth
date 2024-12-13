import { CircleCheck } from "lucide-react";
import Balancer from "react-wrap-balancer";
import Link from "next/link";

import prisma from "@/lib/prisma";
import { Tranche } from "@prisma/client";
import { formatCurrency } from "@/lib/utils";

import { Container, Section } from "../ui/craft";
import { Button } from "../ui/button";
import { Badge } from "../ui/badge";

const Pricing = async () => {
  const tranches = await prisma.tranche.findMany({
    take: 3,
    orderBy: { fee: "asc" },
    skip: 1,
  });

  return (
    <Section id="tranches">
      <Container className="flex flex-col items-center gap-4 text-center">
        <h2 className="!my-0 text-3xl">Choose Your Investment Plan</h2>
        <p className="text-lg opacity-70 md:text-2xl">
          <Balancer>Tailored investment options for your goals.</Balancer>
        </p>

        <div className="not-prose mt-4 grid grid-cols-1 gap-6 min-[850px]:grid-cols-3">
          {tranches.map((plan, index) => (
            <PricingCard plan={plan} key={index} />
          ))}
        </div>
      </Container>
    </Section>
  );
};

const PricingCard = ({ plan }: { plan: Tranche }) => {
  const description = `Stake: ${formatCurrency(
    plan.fee
  )}, to start earning in ${plan.cooldownInterval} days.`;

  return (
    <div className="flex flex-col rounded-lg border p-6">
      <div className="text-center">
        <Badge>{plan.name}</Badge>
        <h4 className="mb-2 mt-4 text-2xl text-primary">
          {formatCurrency(plan.fee)}
        </h4>
        <p className="text-sm opacity-70">{description}</p>
      </div>

      <div className="my-4 border-t"></div>

      <ul className="space-y-3 text-left">
        <li className="flex items-center text-sm opacity-70">
          <CircleCheck className="mr-2 h-4 w-4" />
          Stake: {formatCurrency(plan.fee)}
        </li>
        <li className="flex items-center text-sm opacity-70">
          <CircleCheck className="mr-2 h-4 w-4" />
          Cool Down: {plan.cooldownInterval} days
        </li>
        <li className="flex items-center text-sm opacity-70">
          <CircleCheck className="mr-2 h-4 w-4" />
          Daily Profit Increase: {plan.dailyProfitIncrease}%
        </li>
      </ul>

      <div className="mt-auto pt-6">
        <Button size={"sm"} className="w-full" asChild>
          <Link href={"/dashboard/plans"}>Start earning</Link>
        </Button>
      </div>
    </div>
  );
};

export default Pricing;
