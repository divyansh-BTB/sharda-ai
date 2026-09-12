import { HELPLINE_DISPLAY, HELPLINE_TEL } from "@/lib/sharda-ai";
import { AskChips } from "./ask-chips";
import { AskField } from "./ask-field";

/**
 * Docked ask bar for wider screens. Below `md` the mobile bottom nav takes
 * over, so this is hidden there rather than stacking two bottom-anchored bars.
 *
 * The glass is a separate masked layer rather than a bordered container, so the
 * blur dissolves upward instead of cutting a line across the page.
 */
export function AskBar() {
  return (
    <div className="fixed inset-x-0 bottom-0 z-50 max-md:hidden">
      <div className="relative">
        <div
          aria-hidden="true"
          // These mask values must stay literal — Tailwind scans source
          // statically, so a template literal here compiles to nothing.
          className="pointer-events-none absolute inset-0 bg-gradient-to-t from-[#e7edf5]/95 via-[#eef3f9]/80 to-white/10 backdrop-blur-[18px] backdrop-saturate-[1.35] [mask-image:linear-gradient(to_top,#000_0%,#000_52%,transparent_100%)] [-webkit-mask-image:linear-gradient(to_top,#000_0%,#000_52%,transparent_100%)]"
        />

        <div className="relative mx-auto w-full max-w-3xl px-4 pt-12 pb-[max(1rem,env(safe-area-inset-bottom))] sm:px-6">
          <AskChips className="mb-3" />
          <AskField />

          <p className="mt-3 text-center text-xs leading-5 text-brand-ink/85">
            Answers come from the hospital&apos;s verified records
            <span aria-hidden="true" className="mx-2 opacity-30">
              &middot;
            </span>
            हिंदी ya English, dono chalega
            <span aria-hidden="true" className="mx-2 opacity-30">
              &middot;
            </span>
            Emergency?{" "}
            <a
              href={`tel:${HELPLINE_TEL}`}
              className="font-semibold text-brand-accent-dark underline-offset-2 hover:underline"
            >
              Call {HELPLINE_DISPLAY}
            </a>
          </p>
        </div>
      </div>
    </div>
  );
}
