import Link from "next/link";

import { ArrowRight } from "lucide-react";

import { Section, Container } from "@/components/ui/craft";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";

const Hero = () => {
  return (
    <Section className="relative backdrop-blur-sm py-2">
      <Container className="flex flex-col gap-8">
        <Badge className="w-fit" variant="outline">
          <Link className="group flex items-center gap-1" href="/dashboard">
            Invest Smart. Secure Your Future.
            <ArrowRight className="w-4 transition-all group-hover:-rotate-45" />
          </Link>
        </Badge>
        <h1 className="!mb-0 text-5xl">
          Secure Your Future with AI Agents & Smart Investments
        </h1>
        <h3 className="rounded-md border bg-muted/50 p-4 text-muted-foreground text-2xl">
          Join the investment revolution with our AI-powered platform. Secure
          your financial future with advanced trading across Solana, Ethereum,
          and BSC networks. Don{"'"}t miss out on the opportunity to maximize
          your returns.
        </h3>

        <div className="flex gap-4">
          <Button asChild>
            <Link href={"/dashboard"}>Invest Now</Link>
          </Button>
          <Button asChild variant="outline">
            <Link href={"/#how-it-works"}>Learn More</Link>
          </Button>
        </div>
      </Container>
    </Section>
  );
};

export default Hero;
