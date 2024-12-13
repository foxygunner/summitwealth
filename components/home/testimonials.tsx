"use client";

import * as React from "react";
import { Star } from "lucide-react";

import { Card, CardContent } from "@/components/ui/card";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";

const testimonials = [
  {
    quote:
      "This AI agent has consistently outperformed our expectations. The multi-chain approach has significantly diversified our portfolio.",
    name: "Sarah Johnson",
    role: "Chief Investment Officer",
    company: "TechFund Capital",
  },
  {
    quote:
      "The ability to seamlessly trade across Solana, Ethereum, and BSC has given us a competitive edge. Impressive returns!",
    name: "Michael Chang",
    role: "Senior Portfolio Manager",
    company: "Blockchain Ventures",
  },
  {
    quote:
      "We've seen remarkable growth since investing. The AI's ability to capitalize on cross-chain opportunities is unparalleled.",
    name: "Emma Rodriguez",
    role: "Director of Crypto Investments",
    company: "Future Finance Inc.",
  },
];

export function TestimonialsSection() {
  return (
    <section className="py-12" id="testimonial">
      <div className="container mx-auto px-4">
        <h2 className="text-3xl font-bold text-center mb-8">
          What Our Investors Say
        </h2>
        <Carousel
          opts={{
            align: "start",
          }}
          className="w-full max-w-5xl mx-auto"
        >
          <CarouselContent>
            {testimonials.map((testimonial, index) => (
              <CarouselItem key={index} className="md:basis-1/2 lg:basis-1/3">
                <div className="p-1">
                  <Card>
                    <CardContent className="flex flex-col p-6">
                      <div className="flex mb-4">
                        {[...Array(5)].map((_, i) => (
                          <Star
                            key={i}
                            className="w-5 h-5 text-yellow-400 fill-current"
                          />
                        ))}
                      </div>
                      <blockquote className="text-lg mb-4 flex-grow">
                        &ldquo;{testimonial.quote}&rdquo;
                      </blockquote>
                      <div className="flex items-center">
                        <Avatar className="h-10 w-10 mr-4">
                          <AvatarFallback>
                            {testimonial.name
                              .split(" ")
                              .map((n) => n[0])
                              .join("")}
                          </AvatarFallback>
                        </Avatar>
                        <div>
                          <p className="font-semibold">{testimonial.name}</p>
                          <p className="text-sm text-muted-foreground">
                            {testimonial.role}, {testimonial.company}
                          </p>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </div>
              </CarouselItem>
            ))}
          </CarouselContent>
          <CarouselPrevious />
          <CarouselNext />
        </Carousel>
      </div>
    </section>
  );
}
