import { env } from "@/env.mjs";

export type SiteConfig = {
  name: string;
  description: string;
  url: string;
  ogImage: string;
  defaultTranche: string;
  minClaimmableReward: number;
  links: {
    twitter: string;
    github: string;
  };
};

const baseUrl = process.env.VERCEL_URL
  ? `https://${process.env.VERCEL_URL}`
  : env.NEXT_PUBLIC_APP_URL;

export const siteConfig: SiteConfig = {
  name: "Summit Wealth",
  description:
    "AI-powered investments with secure and seamless trading across multiple blockchain networks.",
  url: baseUrl,
  defaultTranche: "Silver",
  minClaimmableReward: 1,
  ogImage: `${baseUrl}/og.png`,
  links: {
    twitter: "https://twitter.com/shadcn",
    github: "https://github.com/shadcn/taxonomy",
  },
};
