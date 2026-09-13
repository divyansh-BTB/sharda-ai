/** Where the live "Ask Bhartiya Didi" assistant answers questions. */
export const SHARDA_AI_ASK_URL = "https://ai.shardacare.com/q";

/** The assistant's front door, for "just take me there" links. */
export const SHARDA_AI_HOME_URL = "https://ai.shardacare.com/";

export const ASK_PLACEHOLDER = "Which doctor should I see for chest pain?";

/**
 * Cycled through by the typing placeholder. The first entry is what renders
 * server-side, so it doubles as the static fallback when JS is unavailable.
 */
export const PLACEHOLDER_PHRASES: string[] = [
  ASK_PLACEHOLDER,
  "What does the heart checkup at ₹499 include?",
  "Is cashless insurance accepted here?",
  "Book an appointment with a neurologist",
  "Best full body checkup for my parents?",
  "Kya knee replacement yahan hota hai?",
  "How do I get a free second opinion?",
];

/**
 * Builds a deep link into the assistant.
 *
 * `URLSearchParams` serializes with application/x-www-form-urlencoded rules —
 * spaces become `+`, not `%20` — which is exactly what the native GET form in
 * <AskBar /> emits. A tapped chip and a typed question therefore produce
 * byte-identical URLs. Do not swap this for `encodeURIComponent`.
 */
export function askUrl(query: string): string {
  return `${SHARDA_AI_ASK_URL}?${new URLSearchParams({ query })}`;
}

export type SuggestedQuestion = {
  label: string;
  question: string;
};

/** Verbatim from the live assistant's own `quickPrompts` on
 * ai.shardacare.com, so a chip here asks exactly what a chip there asks. */
export const SUGGESTED_QUESTIONS: SuggestedQuestion[] = [
  {
    label: "Find the Right Doctor",
    question:
      "I have chest pain. Which cardiologist should I see at ShardaCare and when are they available?",
  },
  {
    label: "Heart Checkup ₹499",
    question: "What does the ₹499 heart checkup at ShardaCare include?",
  },
  {
    label: "Book an Appointment",
    question:
      "How do I book an OPD appointment at ShardaCare and what are the timings?",
  },
  {
    label: "Insurance & Cashless",
    question:
      "Which insurance companies and TPAs are on panel at ShardaCare for cashless treatment?",
  },
  {
    label: "Treatment Costs",
    question: "What do common treatments and surgeries cost at ShardaCare?",
  },
  {
    label: "Free Second Opinion",
    question:
      "How do I get a free second opinion from ShardaCare's senior specialists using my medical reports?",
  },
];

export const HELPLINE_DISPLAY = "73000 40000";
export const HELPLINE_TEL = "+917300040000";
export const WHATSAPP_URL = "https://wa.me/917300040000";
