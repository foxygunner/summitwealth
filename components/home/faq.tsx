// React and Next.js imports
import React from "react";

// Third-party library imports
import { ArrowUpRight } from "lucide-react";

// UI component imports
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

// Custom components
import { Section, Container } from "@/components/ui/craft";

type FAQItem = {
  question: string;
  answer: string;
  link?: string;
};

const content: FAQItem[] = [
  {
    question: "How do I create and verify my account?",
    link: "/register",
    answer:
      "To create and verify your account, sign up with your email address and follow the verification link sent to your inbox.",
  },
  {
    question: "What cryptocurrencies can I invest with?",
    answer:
      "You can invest with cryptocurrencies from major blockchain networks, including Solana and EVM Chains.",
  },
  {
    question: "How can I withdraw my earnings?",
    answer:
      "You can withdraw your earnings at any time by navigating to the 'Investments' page on your dashboard and choosing the investment to withdraw from.",
    link: "/dashboard/investments",
  },
  {
    question: "Is my investment secure?",
    answer:
      "Yes, your investments are secured with advanced blockchain technology, ensuring full transparency and protection.",
  },
];

const FAQ = () => {
  return (
    <Section id="faq">
      <Container>
        <h3 className="!mt-0 text-2xl">Frequently Asked Questions</h3>
        <h4 className="text-muted-foreground text-lg">
          Can&apos;t find the answer you&apos;re looking for? Reach out to our
          customer support team.
        </h4>
        <div className="not-prose mt-4 flex flex-col gap-4 md:mt-8">
          {content.map((item, index) => (
            <Accordion key={index} type="single" collapsible>
              <AccordionItem
                value={item.question}
                className="rounded-md border bg-muted/20 px-4 transition-all hover:bg-muted/50"
              >
                <AccordionTrigger className="text-left hover:no-underline text-lg">
                  {item.question}
                </AccordionTrigger>
                <AccordionContent className="text-base md:w-3/4">
                  {item.answer}
                  {item.link && (
                    <a
                      href={item.link}
                      className="mt-2 flex w-full items-center opacity-60 transition-all hover:opacity-100"
                    >
                      Learn more <ArrowUpRight className="ml-1" size="16" />
                    </a>
                  )}
                </AccordionContent>
              </AccordionItem>
            </Accordion>
          ))}
        </div>
      </Container>
    </Section>
  );
};

export default FAQ;
