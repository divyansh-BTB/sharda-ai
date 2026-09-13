"use client";

import { useEffect, useState } from "react";
import { WHATSAPP_URL } from "@/lib/sharda-ai";
import { AskChips } from "./ask-chips";
import { AskField } from "./ask-field";

const ICONS = {
  menu: "M4 7h16M4 12h16M4 17h16",
  calendar:
    "M4 7a2 2 0 0 1 2-2h12a2 2 0 0 1 2 2v12a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2V7Zm4-4v4m8-4v4M4 11h16m-6.5 3.5L11 17l-1.5-1.5",
  doctor:
    "M10 11.5a3.6 3.6 0 1 0 0-7.2 3.6 3.6 0 0 0 0 7.2ZM3 20.5a7.2 7.2 0 0 1 9.4-6.9M17.6 18.4a2.7 2.7 0 1 0 0-5.4 2.7 2.7 0 0 0 0 5.4Zm2 2-1.4-1.4",
  whatsapp:
    "M12 3.2a8.8 8.8 0 0 0-7.5 13.4L3.4 20.6l4.1-1.1A8.8 8.8 0 1 0 12 3.2Zm4.7 12c-.2.6-1.2 1.1-1.7 1.1-.9.1-1.7-.5-3.4-1.5a9.4 9.4 0 0 1-3.2-3.6c-.5-1-.1-1.9.3-2.3.2-.2.5-.3.7-.2h.5c.2 0 .4 0 .6.5l.7 1.6c.1.2 0 .4-.1.5l-.4.5c-.1.2-.2.3 0 .6.5.8 1.5 1.7 2.4 2.1.3.2.5.1.6 0l.7-.8c.2-.2.3-.2.5-.1l1.5.8c.4.2.5.3.5.5Z",
  spark: "M12 4l1.9 5.1 5.1 1.9-5.1 1.9L12 20l-1.9-5.1L5 12l5.1-1.9L12 4Z",
  close: "M6 6l12 12M18 6 6 18",
} as const;

function NavIcon({ path, className }: { path: string; className?: string }) {
  return (
    <svg
      className={className}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={1.7}
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      <path d={path} />
    </svg>
  );
}

const ITEM =
  "flex min-w-0 flex-1 flex-col items-center justify-center gap-1 py-2.5 text-[10px] font-semibold leading-tight tracking-tight text-brand-ink";

/**
 * Mobile bottom navigation with a centre Ask AI action.
 *
 * Tapping the FAB dims the page and fans the assistant up out of it, with the
 * icon rotating into a close affordance — so the button that opened the panel
 * is also the one that shuts it, and it never moves.
 *
 * Progressive enhancement: the FAB is a real link to the assistant, so it works
 * with scripting unavailable. When JS runs the click is intercepted and the
 * panel opens locally, keeping the visitor on this page.
 */
export function MobileAskNav() {
  const [open, setOpen] = useState(false);

  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setOpen(false);
    };
    document.addEventListener("keydown", onKey);
    const { overflow } = document.body.style;
    document.body.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", onKey);
      document.body.style.overflow = overflow;
    };
  }, [open]);

  return (
    <div className="md:hidden">
      {open && (
        <>
          <button
            type="button"
            aria-label="Close"
            onClick={() => setOpen(false)}
            className="fade-in fixed inset-0 z-60 h-full w-full cursor-default bg-gradient-to-b from-brand-indigo/55 via-brand-ink/75 to-brand-ink/90 backdrop-blur-[3px]"
          />

          {/* Sits above the bar rather than docking to the viewport floor, so
              the FAB it grew out of stays visible underneath. */}
          <div
            role="dialog"
            aria-modal="true"
            aria-labelledby="ask-didi-title"
            className="fixed inset-x-0 bottom-[calc(7.5rem+env(safe-area-inset-bottom))] z-65 px-4"
          >
            <div className="rise-in mb-4 text-center">
              <h2
                id="ask-didi-title"
                className="text-[26px] font-extrabold leading-tight tracking-tight text-white"
              >
                Ask Bhartiya Didi
              </h2>
              <p className="mt-1.5 text-xs font-medium text-white/75">
                हिंदी ya English, dono chalega
              </p>
            </div>

            <AskChips className="rise-in -mx-4 mb-3 px-4" />
            <div className="rise-in" style={{ animationDelay: "60ms" }}>
              <AskField />
            </div>
          </div>
        </>
      )}

      <nav
        aria-label="Quick actions"
        className="fixed inset-x-0 bottom-0 z-70 flex items-stretch border-t border-brand-line bg-white pb-[env(safe-area-inset-bottom)] shadow-[0_-4px_16px_-8px_rgba(22,40,58,0.18)]"
      >
        <button type="button" className={ITEM}>
          <NavIcon path={ICONS.menu} className="size-6" />
          <span className="truncate">Menu</span>
        </button>

        <a href="https://shardacare.com" className={ITEM}>
          <NavIcon path={ICONS.calendar} className="size-6" />
          <span className="truncate">Book Appoint.</span>
        </a>

        {/* Raised into a notch: the white ring reads as the bar cut away. */}
        <div className="flex w-20 shrink-0 flex-col items-center justify-end pb-2">
          <a
            href="https://ai.shardacare.com/"
            onClick={(e) => {
              e.preventDefault();
              setOpen((v) => !v);
            }}
            aria-haspopup="dialog"
            aria-expanded={open}
            aria-label={open ? "Close Bhartiya Didi" : "Ask Bhartiya Didi"}
            className="-mt-8 flex size-14 items-center justify-center rounded-full bg-[image:var(--brand-cta)] text-white shadow-[0_8px_24px_-6px_rgba(222,34,99,0.65)] ring-[6px] ring-white transition-transform duration-300 active:scale-95"
          >
            <NavIcon
              path={open ? ICONS.close : ICONS.spark}
              className={`size-6 transition-transform duration-300 ${open ? "rotate-90" : ""}`}
            />
          </a>
          <span className="mt-2.5 text-[10px] font-semibold leading-tight tracking-tight text-brand-accent-dark">
            Ask Didi
          </span>
        </div>

        <a href="https://shardacare.com" className={ITEM}>
          <NavIcon path={ICONS.doctor} className="size-6" />
          <span className="truncate">Find a Doctor</span>
        </a>

        <a href={WHATSAPP_URL} className={`${ITEM} text-[#258a4a]`}>
          <span className="flex size-6 items-center justify-center rounded-full bg-[#25D366] text-white">
            <NavIcon path={ICONS.whatsapp} className="size-4" />
          </span>
          <span className="truncate">WhatsApp</span>
        </a>
      </nav>
    </div>
  );
}
