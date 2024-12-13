"use client";

import * as React from "react";
import { ArrowUpRight } from "lucide-react";
import { Label, Pie, PieChart } from "recharts";
import Link from "next/link";

import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  ChartConfig,
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart";
import { UserChartData } from "@/lib/validations/user";

const chartConfig = {
  value: {
    label: "Value",
  },
  deposit: {
    label: "Deposit",
    color: "hsl(var(--chart-1))",
  },
  withdrawal: {
    label: "Withdrawal",
    color: "hsl(var(--chart-2))",
  },
  reward: {
    label: "Reward",
    color: "hsl(var(--chart-3))",
  },
} satisfies ChartConfig;

export function PieGraph({ chartData }: { chartData: UserChartData }) {
  const totalValue = React.useMemo(() => {
    return chartData.reduce((acc, curr) => acc + curr.value, 0);
  }, []);

  return (
    <Card className="flex flex-col">
      <CardHeader className="items-center pb-0">
        <CardTitle>Transaction Types & Values (USD)</CardTitle>
        <CardDescription className="text-center">
          Overview of your transaction types and their total values in USD.
        </CardDescription>
      </CardHeader>
      <CardContent className="flex-1 pb-0">
        <ChartContainer
          config={chartConfig}
          className="mx-auto aspect-square max-h-[360px]"
        >
          <PieChart>
            <ChartTooltip
              cursor={false}
              content={<ChartTooltipContent hideLabel />}
            />
            <Pie
              data={chartData}
              dataKey="value"
              nameKey="transactionType"
              innerRadius={60}
              strokeWidth={5}
            >
              <Label
                content={({ viewBox }) => {
                  if (viewBox && "cx" in viewBox && "cy" in viewBox) {
                    return (
                      <text
                        x={viewBox.cx}
                        y={viewBox.cy}
                        textAnchor="middle"
                        dominantBaseline="middle"
                      >
                        <tspan
                          x={viewBox.cx}
                          y={viewBox.cy}
                          className="fill-foreground text-3xl font-bold"
                        >
                          {totalValue.toLocaleString()}
                        </tspan>
                        <tspan
                          x={viewBox.cx}
                          y={(viewBox.cy || 0) + 24}
                          className="fill-muted-foreground"
                        >
                          Value
                        </tspan>
                      </text>
                    );
                  }
                }}
              />
            </Pie>
          </PieChart>
        </ChartContainer>
      </CardContent>
      <CardFooter className="flex-col gap-2 text-sm">
        <div className="font-medium leading-none">
          Check transaction history for details.
        </div>

        <div className="flex items-center gap-2 text-muted-foreground leading-none">
          <Link href={"/dashboard/transactions"}>Transaction history </Link>
          <ArrowUpRight className="h-4 w-4" />
        </div>
      </CardFooter>
    </Card>
  );
}
