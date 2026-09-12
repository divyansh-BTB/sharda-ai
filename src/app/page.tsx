import { AskBar } from "@/components/ask-bar";
import { MobileAskNav } from "@/components/mobile-ask-nav";

type Service = {
  title: string;
  detail: string;
  tile: string;
  icon: "heart" | "pulse" | "beaker" | "shield" | "calendar" | "users";
};

const SERVICES: Service[] = [
  {
    title: "Cardiac Sciences",
    detail: "Angioplasty, bypass and rhythm care under one roof.",
    tile: "bg-brand-accent",
    icon: "heart",
  },
  {
    title: "24/7 Emergency",
    detail: "Trauma bays and ICU staffed around the clock.",
    tile: "bg-brand-ink",
    icon: "pulse",
  },
  {
    title: "Diagnostics & Labs",
    detail: "NABL-accredited pathology with same-day reports.",
    tile: "bg-brand-primary",
    icon: "beaker",
  },
  {
    title: "Insurance & Cashless",
    detail: "Empanelled with every major insurer and TPA.",
    tile: "bg-brand-indigo",
    icon: "shield",
  },
  {
    title: "Book an Appointment",
    detail: "OPD slots online, on call, or over WhatsApp.",
    tile: "bg-brand-primary-dark",
    icon: "calendar",
  },
  {
    title: "90+ Specialists",
    detail: "Consultants across more than 30 institutes.",
    tile: "bg-brand-accent-dark",
    icon: "users",
  },
];

const ICON_PATHS: Record<Service["icon"], string> = {
  heart:
    "M12 20s-7-4.6-7-9.4A3.9 3.9 0 0 1 12 8a3.9 3.9 0 0 1 7 2.6C19 15.4 12 20 12 20Z",
  pulse: "M3 12h4l2.5-7 4 14L16 12h5",
  beaker:
    "M9 3v6.5L4.5 18A2 2 0 0 0 6.3 21h11.4a2 2 0 0 0 1.8-3L15 9.5V3M8 3h8M7.5 14h9",
  shield:
    "M12 3l7 3v5.5c0 4.3-3 8-7 9.5-4-1.5-7-5.2-7-9.5V6l7-3Zm-3 9 2.2 2.2L15.5 10",
  calendar:
    "M4 7a2 2 0 0 1 2-2h12a2 2 0 0 1 2 2v12a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2V7Zm4-4v4m8-4v4M4 11h16",
  users:
    "M16 20v-1.5a4 4 0 0 0-4-4H7a4 4 0 0 0-4 4V20M9.5 10.5a3.5 3.5 0 1 0 0-7 3.5 3.5 0 0 0 0 7ZM21 20v-1.5a4 4 0 0 0-3-3.9M16.5 3.8a4 4 0 0 1 0 7.4",
};

function ServiceIcon({ icon }: { icon: Service["icon"] }) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={1.8}
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
      className="size-5"
    >
      <path d={ICON_PATHS[icon]} />
    </svg>
  );
}

export default function Home() {
  return (
    <div className="relative min-h-dvh bg-brand-bg">
      {/* Fixed colour wash. The ask bar's frosted glass needs saturated
          colour behind it to refract, including before the page scrolls. */}
      <div
        aria-hidden="true"
        className="pointer-events-none fixed inset-0 -z-10 overflow-hidden"
      >
        <div className="absolute -left-40 -top-32 size-[36rem] rounded-full bg-brand-primary/25 blur-3xl" />
        <div className="absolute -right-40 top-10 size-[32rem] rounded-full bg-brand-accent/20 blur-3xl" />
        <div className="absolute -left-24 bottom-[-14rem] size-[40rem] rounded-full bg-brand-indigo/25 blur-3xl" />
        <div className="absolute right-[-8rem] bottom-[-16rem] size-[38rem] rounded-full bg-brand-accent/25 blur-3xl" />
      </div>

      <header className="mx-auto flex w-full max-w-5xl items-center justify-between gap-4 px-6 py-5">
        <div className="flex items-center gap-3">
          <span className="text-lg font-bold tracking-tight text-brand-ink">
            Sharda<span className="text-brand-accent">Care</span>
          </span>
          <span aria-hidden="true" className="h-5 w-px bg-brand-primary/20" />
          <span className="text-sm font-semibold text-brand-muted max-sm:sr-only">
            Healthcity
          </span>
        </div>
        <a
          href="https://shardacare.com"
          className="rounded-full border border-brand-primary/20 bg-white/70 px-4 py-2 text-sm font-semibold text-brand-ink backdrop-blur-sm transition-colors hover:border-brand-primary/40 hover:bg-white"
        >
          Go to Website
        </a>
      </header>

      <main className="mx-auto w-full max-w-5xl px-6 pb-64 pt-10 sm:pt-16">
        <p className="inline-flex items-center gap-2 rounded-full border border-brand-primary/15 bg-white/70 px-4 py-2 text-sm font-semibold text-brand-ink shadow-sm backdrop-blur-sm">
          <span aria-hidden="true">&#x1F64F;</span>
          Namaste, main Bhartiya Didi hoon
        </p>

        <h1 className="mt-7 max-w-3xl text-balance text-4xl font-bold leading-[1.08] tracking-tight text-brand-ink sm:text-6xl">
          Ask <span className="text-brand-indigo">Bhartiya Didi</span>. The
          right care starts with one question.
        </h1>

        <p className="mt-6 max-w-xl text-pretty text-lg leading-8 text-brand-muted">
          Type your question in Hindi or English. Didi reads ShardaCare
          Healthcity&apos;s verified records and builds your answer in seconds.
          No menus, no hold music, no guesswork.
        </p>

        <ul className="mt-14 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {SERVICES.map(({ title, detail, tile, icon }) => (
            <li
              key={title}
              className="rounded-2xl border border-white/70 bg-white/75 p-5 shadow-[0_1px_2px_rgba(22,40,58,0.04),0_12px_32px_-20px_rgba(22,40,58,0.3)] backdrop-blur-sm"
            >
              <span
                className={`inline-flex size-10 items-center justify-center rounded-xl text-white ${tile}`}
              >
                <ServiceIcon icon={icon} />
              </span>
              <h2 className="mt-4 font-semibold text-brand-ink">{title}</h2>
              <p className="mt-1 text-sm leading-6 text-brand-muted">
                {detail}
              </p>
            </li>
          ))}
        </ul>
      </main>

      <AskBar />
      <MobileAskNav />
    </div>
  );
}
