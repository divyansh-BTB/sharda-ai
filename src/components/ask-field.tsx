import {
  PLACEHOLDER_PHRASES,
  SHARDA_AI_ASK_URL,
  SHARDA_AI_HOME_URL,
} from "@/lib/sharda-ai";

/** The send glyph from sharda.ac.in's own assistant widget, verbatim. */
function SendIcon({ className }: { className?: string }) {
  return (
    <svg
      className={className}
      viewBox="0 0 24 24"
      fill="currentColor"
      aria-hidden="true"
    >
      <path d="M3.5 20.5l17.1-7.32a1 1 0 0 0 0-1.84L3.5 4.02a.98.98 0 0 0-1.37.9L2.1 9.4c0 .49.36.9.85.97L15 12l-12.05 1.63c-.49.07-.85.48-.85.97l.03 4.5c0 .7.72 1.18 1.37.9z" />
    </svg>
  );
}

/**
 * The ask field — a native GET form that hands `query` to the live assistant.
 * Shared by the desktop bar and the mobile sheet.
 *
 * Two submits by design, mirroring the reference layout: a quiet arrow inside
 * the pill, and the labelled primary alongside it. Both post the same form, so
 * whichever the visitor reaches for carries their question through to
 * ai.shardacare.com rather than discarding it.
 *
 * The rotating placeholder is pure CSS — phrases stacked and cross-faded on a
 * staggered delay, shown only while `:placeholder-shown` matches. That keeps
 * this a Server Component with no client JS, and it still works (showing a
 * static first phrase) if scripting is unavailable.
 */
export function AskField() {
  return (
    <div className="flex w-full items-center gap-2.5 sm:gap-3">
      <form
        action={SHARDA_AI_ASK_URL}
        method="GET"
        className="group min-w-0 grow rounded-[17px] bg-gradient-to-r from-brand-primary/55 via-brand-indigo/45 to-brand-accent/55 p-px shadow-[0_2px_6px_-2px_rgba(22,40,58,0.1),0_18px_44px_-16px_rgba(20,61,97,0.45)] transition-all duration-300 focus-within:from-brand-primary focus-within:via-brand-indigo focus-within:to-brand-accent focus-within:shadow-[0_2px_8px_-2px_rgba(22,40,58,0.12),0_24px_56px_-16px_rgba(20,61,97,0.55)]"
      >
        <div className="flex w-full items-center gap-3 rounded-2xl bg-white p-1.5 pl-3 shadow-[0_1px_2px_rgba(22,40,58,0.05),0_2px_6px_-2px_rgba(22,40,58,0.08)]">
          {/* The product's actual differentiator, stated in the control. */}
          <span
            aria-hidden="true"
            className="shrink-0 rounded-lg bg-brand-primary/[0.09] px-2 py-1.5 text-[10px] font-semibold leading-none tracking-wide text-brand-primary-dark"
          >
            हिं<span className="opacity-40">/</span>EN
          </span>
          <span
            aria-hidden="true"
            className="h-6 w-px shrink-0 bg-brand-line"
          />

          <div className="relative min-w-0 grow">
            <input
              type="search"
              name="query"
              required
              maxLength={300}
              autoComplete="off"
              enterKeyHint="search"
              aria-label="Ask Bhartiya Didi, in Hindi or English"
              placeholder=" "
              className="peer w-full bg-transparent py-2.5 text-base font-medium tracking-[-0.01em] text-brand-ink outline-none [&::-webkit-search-cancel-button]:hidden"
            />
            <span
              aria-hidden="true"
              className="pointer-events-none absolute inset-0 flex items-center overflow-hidden opacity-0 peer-placeholder-shown:opacity-100"
            >
              {PLACEHOLDER_PHRASES.map((phrase, i) => (
                <span
                  key={phrase}
                  style={{ animationDelay: `${i * 4}s` }}
                  className="phrase-cycle absolute inset-x-0 truncate text-base text-brand-muted/55"
                >
                  {phrase}
                </span>
              ))}
            </span>
          </div>

          {/* Quiet inline submit, and the only one once the label collapses. */}
          <button
            type="submit"
            aria-label="Ask"
            className="flex size-9 shrink-0 items-center justify-center rounded-full text-brand-accent transition hover:bg-brand-accent/10 hover:text-brand-accent-dark focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand-accent group-has-[input:placeholder-shown]:cursor-default group-has-[input:placeholder-shown]:text-brand-muted/40 group-has-[input:placeholder-shown]:hover:bg-transparent"
          >
            <SendIcon className="-ml-px size-5" />
          </button>
        </div>
      </form>

      <a
        href={SHARDA_AI_HOME_URL}
        className="hidden shrink-0 items-center gap-1.5 rounded-xl bg-[image:var(--brand-cta)] px-6 py-3.5 text-sm font-semibold text-white shadow-[inset_0_1px_0_rgba(255,255,255,0.3),0_8px_22px_-8px_rgba(222,34,99,0.8)] transition hover:brightness-[1.07] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand-accent active:brightness-95 sm:inline-flex"
      >
        Ask Bhartiya Didi
      </a>
    </div>
  );
}
