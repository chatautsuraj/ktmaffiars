import "server-only";
import { generateText, Output } from "ai";
import { openai } from "@ai-sdk/openai";
import { z } from "zod";
import type { LanguageModel } from "ai";
import type { NormalizedItem } from "./types";

export interface AISummary {
  title: string;
  excerpt: string;
  /** HTML body (paragraphs). Attribution is appended separately by the pipeline. */
  content: string;
}

const summarySchema = z.object({
  title: z.string().describe("An original, factual headline in the site's editorial tone."),
  excerpt: z.string().describe("A 1-2 sentence standfirst summary."),
  paragraphs: z
    .array(z.string())
    .describe("2-4 original prose paragraphs summarizing the story. Plain text, no HTML."),
});

/**
 * Returns the configured model, or null when no provider credentials are set.
 * - OPENAI_API_KEY  -> direct OpenAI provider (AUTOPILOT_MODEL, default gpt-4o-mini)
 * - AI_GATEWAY_API_KEY -> Vercel AI Gateway via a plain "provider/model" string
 */
function resolveModel(): { model: LanguageModel; label: string } | null {
  const configured = process.env.AUTOPILOT_MODEL?.trim();
  if (process.env.OPENAI_API_KEY) {
    const name = (configured || "gpt-4o-mini").replace(/^openai\//, "");
    return { model: openai(name), label: `openai:${name}` };
  }
  if (process.env.AI_GATEWAY_API_KEY) {
    const id = configured || "openai/gpt-4o-mini";
    return { model: id, label: `gateway:${id}` };
  }
  return null;
}

export function isAIConfigured(): boolean {
  return resolveModel() !== null;
}

export function aiModelLabel(): string | null {
  return resolveModel()?.label ?? null;
}

/**
 * Produce an ORIGINAL rewritten summary of a source item. Returns null on any
 * failure (missing key, network error, invalid output) so the caller falls
 * back to excerpt mode and the run never crashes.
 */
export async function summarizeItem(item: NormalizedItem): Promise<AISummary | null> {
  const resolved = resolveModel();
  if (!resolved) return null;

  const system =
    "You are an editor at KTM Affairs, a premium international-affairs publication. " +
    "Rewrite the provided source material into an ORIGINAL, concise, factual summary in a neutral, " +
    "professional editorial tone. Do NOT copy sentences verbatim from the source. Do not fabricate " +
    "facts, quotes, or figures beyond what the source states. Do not include attribution lines, " +
    "URLs, or 'read more' text — that is added separately.";

  const prompt =
    `Source outlet: ${item.feedName}\n` +
    `Source headline: ${item.title}\n` +
    `Source summary: ${item.summary || "(no summary provided)"}\n\n` +
    "Write an original headline, a one-to-two sentence excerpt, and 2-4 short original paragraphs.";

  try {
    const { output } = await generateText({
      model: resolved.model,
      output: Output.object({ schema: summarySchema }),
      system,
      prompt,
    });

    const paragraphs = output.paragraphs.map((p) => p.trim()).filter(Boolean);
    if (!output.title.trim() || paragraphs.length === 0) return null;

    return {
      title: output.title.trim(),
      excerpt: output.excerpt.trim() || paragraphs[0].slice(0, 200),
      content: paragraphs.map((p) => `<p>${escapeHtml(p)}</p>`).join("\n"),
    };
  } catch {
    return null;
  }
}

function escapeHtml(input: string): string {
  return input
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;");
}
