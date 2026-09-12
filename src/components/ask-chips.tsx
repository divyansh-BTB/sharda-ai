import { askUrl, SUGGESTED_QUESTIONS } from "@/lib/sharda-ai";

/**
 * Suggested questions as plain links — right-clickable and shareable, and they
 * work without JS. Opaque so page content never shows through them.
 */
export function AskChips({ className }: { className?: string }) {
  return (
    <nav
      aria-label="Suggested questions"
      className={`overflow-x-auto [mask-image:linear-gradient(90deg,transparent,#000_22px,#000_calc(100%-22px),transparent)] [scrollbar-width:none] [&::-webkit-scrollbar]:hidden ${className ?? ""}`}
    >
      <ul className="flex w-max items-center gap-2 px-1.5 py-1">
        {SUGGESTED_QUESTIONS.map(({ label, question }, i) => (
          <li key={label}>
            <a
              href={askUrl(question)}
              style={{ animationDelay: `${i * 60}ms` }}
              className="chip-in inline-flex max-w-[210px] items-center overflow-hidden rounded-full bg-white px-4 py-2 text-[13px] font-medium whitespace-nowrap text-brand-ink/80 shadow-[0_1px_2px_rgba(22,40,58,0.06),0_4px_10px_-6px_rgba(20,61,97,0.25)] ring-1 ring-brand-ink/[0.06] transition hover:text-brand-primary hover:shadow-[0_2px_4px_rgba(22,40,58,0.08),0_8px_18px_-8px_rgba(20,61,97,0.35)] hover:ring-brand-primary/25 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand-primary"
            >
              {label}
            </a>
          </li>
        ))}
      </ul>
    </nav>
  );
}
