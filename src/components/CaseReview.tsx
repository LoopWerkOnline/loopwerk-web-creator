import type { CaseReview as Review } from "@/lib/cases";

/** Sterren als tekst, met een leesbaar label voor schermlezers. */
export function ReviewStars({ rating, className = "" }: { rating: number; className?: string }) {
  return (
    <span
      className={`tracking-[0.15em] text-home-accent ${className}`}
      aria-label={`${rating} van 5 sterren`}
    >
      <span aria-hidden="true">{"★".repeat(rating)}</span>
    </span>
  );
}

/** Volledige review voor de casepagina, compact op donkere achtergrond. */
export function CaseReviewBlock({ review }: { review: Review }) {
  return (
    <figure className="max-w-3xl border-l-2 border-home-accent pl-5 md:pl-6">
      <ReviewStars rating={review.rating} className="text-sm" />
      <blockquote className="mt-3 text-base leading-relaxed text-cream/85 md:text-lg">
        “{review.quote}”
      </blockquote>
      <figcaption className="mt-4 text-sm text-cream/65">
        <span className="font-semibold text-cream">{review.author}</span>,{" "}
        {review.role.charAt(0).toLowerCase() + review.role.slice(1)} ·{" "}
        <a
          href={review.url}
          target="_blank"
          rel="noopener noreferrer"
          className="underline underline-offset-4 hover:text-cream"
        >
          review op {review.source}
        </a>
      </figcaption>
    </figure>
  );
}

/** Korte versie voor de uitgelichte case op de homepage (donkere achtergrond). */
export function CaseReviewShort({ review }: { review: Review }) {
  return (
    <figure className="mt-8 border-l-2 border-home-accent pl-5">
      <ReviewStars rating={review.rating} className="text-sm" />
      <blockquote className="mt-2 text-lg leading-snug text-cream">“{review.short}”</blockquote>
      <figcaption className="mt-2 text-sm text-cream/65">
        {review.author}, {review.role.charAt(0).toLowerCase() + review.role.slice(1)} ·{" "}
        <a
          href={review.url}
          target="_blank"
          rel="noopener noreferrer"
          className="underline underline-offset-4 hover:text-cream"
        >
          review op {review.source}
        </a>
      </figcaption>
    </figure>
  );
}
