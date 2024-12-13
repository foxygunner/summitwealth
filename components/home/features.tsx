import Link from "next/link";

import type { ValidIcon } from "@/components/icons";
import {
  CardContainer,
  CardFeature,
  CardHeader,
  CardIcon,
  CardTitle,
} from "@/components/marketing/card";
import { Button } from "../ui/button";

const features: {
  icon: ValidIcon;
  catchline: string;
  description: string;
}[] = [
  {
    icon: "shield",
    catchline: "Top-Notch Security",
    description:
      "Your investments are secured with advanced blockchain technology, ensuring full transparency and protection.",
  },
  {
    icon: "bot",
    catchline: "Autonomous AI Agents",
    description:
      "Benefit from our autonomous AI agents that trade onchain across major blockchain networks to maximize your returns.",
  },
  {
    icon: "clock",
    catchline: "Flexible Withdrawals",
    description:
      "Withdraw your stake and profits anytime, offering you complete control over your investments.",
  },
];

const Feature = () => {
  return (
    <CardContainer>
      <CardHeader>
        <CardIcon icon="play" />
        <CardTitle>Why Choose Us?</CardTitle>
      </CardHeader>
      <ul className="grid grid-cols-1 gap-4 sm:grid-cols-3 sm:gap-6">
        {features?.map((feature, i) => (
          // biome-ignore lint/suspicious/noArrayIndexKey: <explanation>
          <CardFeature key={i} {...feature} />
        ))}
      </ul>
      <div className="order-first flex items-center justify-center gap-2 text-center md:order-none">
        <Button variant="outline" className="rounded-full" asChild>
          <Link href="/dashboard">Start earning</Link>
        </Button>
        <Button className="rounded-full" asChild>
          <Link href="/#faq">More Questions?</Link>
        </Button>
      </div>
    </CardContainer>
  );
};

export default Feature;
