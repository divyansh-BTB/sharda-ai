import content from "./ask-content.json";

/**
 * All copy and URLs live in ask-content.json, which the embed build script
 * reads too — so the React component and the standalone embed.js can never
 * drift apart. Edit the JSON, not this file.
 */

/** Where the live "Ask Bhartiya Didi" assistant answers questions. */
export const SHARDA_AI_ASK_URL = content.askUrl;

/** The assistant's front door, for "just take me there" links. */
export const SHARDA_AI_HOME_URL = content.homeUrl;

export const PLACEHOLDER_PHRASES: string[] = content.placeholderPhrases;
export const ASK_PLACEHOLDER = PLACEHOLDER_PHRASES[0];

/**
 * Builds a deep link into the assistant.
 *
 * `URLSearchParams` serializes with application/x-www-form-urlencoded rules —
 * spaces become `+`, not `%20` — which is exactly what the native GET form in
 * <AskField /> emits. A tapped chip and a typed question therefore produce
 * byte-identical URLs. Do not swap this for `encodeURIComponent`.
 */
export function askUrl(query: string): string {
  return `${SHARDA_AI_ASK_URL}?${new URLSearchParams({ query })}`;
}

export type SuggestedQuestion = {
  label: string;
  question: string;
};

export const SUGGESTED_QUESTIONS: SuggestedQuestion[] =
  content.suggestedQuestions;

export const CTA_LABEL = content.ctaLabel;
export const NOTE = content.note;
export const HELPLINE_DISPLAY = content.helplineDisplay;
export const HELPLINE_TEL = content.helplineTel;
export const WHATSAPP_URL = content.whatsappUrl;
