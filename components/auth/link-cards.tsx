import { ArrowRight, ArrowUpRight } from "lucide-react";
import Link from "next/link";

import {
  Card,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

const links = [
  {
    title: "Login",
    description: "Sign in to you account",
    href: "/login",
  },
  {
    title: "Sign Up",
    description: "Create your account",
    href: "/register",
  },
];

export function LinkCards() {
  return (
    <div className="grid w-full grid-cols-1 gap-4 sm:grid-cols-2">
      {links.map((link) => {
        const isExternal = link.href.startsWith("http");
        const href = link.href;
        const target = isExternal ? "_blank" : undefined;
        return (
          <Link
            key={link.href}
            href={href}
            target={target}
            className="group flex w-full flex-1"
          >
            <Card className="flex w-full flex-col">
              <CardHeader className="flex-1">
                <CardTitle>{link.title}</CardTitle>
                <div className="flex flex-1 justify-between gap-2">
                  <CardDescription>{link.description}</CardDescription>
                  {isExternal ? (
                    <ArrowUpRight className="h-4 w-4 shrink-0 self-end text-muted-foreground group-hover:text-foreground" />
                  ) : (
                    <ArrowRight className="h-4 w-4 shrink-0 self-end text-muted-foreground group-hover:text-foreground" />
                  )}
                </div>
              </CardHeader>
            </Card>
          </Link>
        );
      })}
    </div>
  );
}
