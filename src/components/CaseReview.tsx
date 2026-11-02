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

/** Volledige review voor de casepagina. */
export function CaseReviewBlock({ review }: { review: Review }) {
  return (
    <figure className="rounded-2xl border border-line bg-cream p-8 md:p-12">
      <div className="flex flex-wrap items-center justify-between gap-4">
        <ReviewStars rating={review.rating} className="text-xl" />
        <span className="text-xs font-semibold uppercase tracking-[0.14em] text-ink/55">
          Review op {review.source}
        </span>
      </div>
      <blockquote className="mt-6 max-w-4xl text-xl leading-snug text-ink md:text-3xl">
        “{review.quote}”
      </blockquote>
      <figcaption className="mt-8 flex flex-wrap items-end justify-between gap-4">
        <div>
          <p className="font-semibold text-ink">{review.author}</p>
          <p className="text-sm text-ink/65">{review.role}</p>
        </div>
        <a
          href={review.url}
          target="_blank"
          rel="noopener noreferrer"
          className="text-sm font-semibold text-forest underline underline-offset-4"
        >
          Bekijk de review op {review.source} ↗
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
