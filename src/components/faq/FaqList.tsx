import { Link } from "@tanstack/react-router";
import { ArrowRight } from "lucide-react";

import {
  Accordion,
  AccordionItem,
  AccordionTrigger,
  AccordionContent,
} from "@/components/ui/accordion";
import type { FaqItem } from "@/lib/content";

/** Uitklapbare vragen met per antwoord een link verder de site in. Gebruikt op /faq en de oplossingspagina's. */
export function FaqList({ items }: { items: FaqItem[] }) {
  return (
    <Accordion type="single" collapsible>
      {items.map((item, i) => (
        <AccordionItem key={item.q} value={`item-${i}`}>
          <AccordionTrigger className="text-lg leading-snug text-ink">{item.q}</AccordionTrigger>
          <AccordionContent className="leading-relaxed text-ink/70">
            <p>{item.a}</p>
            {item.link ? (
              <Link
                to={item.link.path}
                className="group mt-4 inline-flex items-center gap-2 font-semibold text-home-accent underline-offset-4 hover:underline"
              >
                {item.link.label}
                <ArrowRight
                  className="h-4 w-4 transition-transform group-hover:translate-x-1"
                  aria-hidden="true"
                />
              </Link>
            ) : null}
          </AccordionContent>
        </AccordionItem>
      ))}
    </Accordion>
  );
}
