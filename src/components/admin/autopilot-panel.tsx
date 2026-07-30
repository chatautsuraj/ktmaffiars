"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { Loader2, Play, Save, Plus, Trash2, Sparkles, FileText } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { FormField, Select } from "@/components/admin/form-fields";
import type { AutopilotConfig, FeedConfig, RunSummary } from "@/lib/autopilot/types";

interface AutopilotPanelProps {
  initialConfig: AutopilotConfig;
  categories: { slug: string; name: string }[];
  authors: { id: string; name: string }[];
  ai: { configured: boolean; model: string | null };
}

export function AutopilotPanel({ initialConfig, categories, authors, ai }: AutopilotPanelProps) {
  const router = useRouter();
  const [config, setConfig] = useState<AutopilotConfig>(initialConfig);
  const [saving, setSaving] = useState(false);
  const [savedMsg, setSavedMsg] = useState("");
  const [error, setError] = useState("");
  const [running, setRunning] = useState(false);
  const [summary, setSummary] = useState<RunSummary | null>(null);

  const update = <K extends keyof AutopilotConfig>(key: K, value: AutopilotConfig[K]) => {
    setConfig((prev) => ({ ...prev, [key]: value }));
    setSavedMsg("");
  };

  const updateFeed = (index: number, patch: Partial<FeedConfig>) => {
    setConfig((prev) => ({
      ...prev,
      feeds: prev.feeds.map((f, i) => (i === index ? { ...f, ...patch } : f)),
    }));
    setSavedMsg("");
  };

  const addFeed = () => {
    setConfig((prev) => ({
      ...prev,
      feeds: [...prev.feeds, { name: "", url: "", category: prev.defaultCategorySlug, enabled: true }],
    }));
  };

  const removeFeed = (index: number) => {
    setConfig((prev) => ({ ...prev, feeds: prev.feeds.filter((_, i) => i !== index) }));
  };

  const save = async () => {
    setSaving(true);
    setError("");
    setSavedMsg("");
    try {
      const res = await fetch("/api/admin/autopilot/config", {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(config),
      });
      if (!res.ok) throw new Error("Failed to save settings");
      const data = await res.json();
      setConfig(data.config);
      setSavedMsg("Settings saved.");
    } catch (e) {
      setError(e instanceof Error ? e.message : "Failed to save settings");
    } finally {
      setSaving(false);
    }
  };

  const runNow = async () => {
    setRunning(true);
    setError("");
    setSummary(null);
    try {
      const res = await fetch("/api/admin/autopilot/run", { method: "POST" });
      if (!res.ok) throw new Error("Run failed");
      const data = (await res.json()) as RunSummary;
      setSummary(data);
      if (data.created > 0) router.refresh();
    } catch (e) {
      setError(e instanceof Error ? e.message : "Run failed");
    } finally {
      setRunning(false);
    }
  };

  return (
    <div className="max-w-4xl space-y-8">
      {/* AI status */}
      <div
        className={`flex items-start gap-3 border p-4 text-sm ${
          ai.configured ? "border-emerald-500/40 bg-emerald-500/5" : "border-amber-500/40 bg-amber-500/5"
        }`}
      >
        <Sparkles className="h-4 w-4 mt-0.5 shrink-0" />
        <div>
          {ai.configured ? (
            <p>
              <span className="font-medium">AI summaries enabled</span> — model{" "}
              <code className="text-xs bg-light-gray px-1">{ai.model}</code>. Autopilot writes original
              rewritten summaries with attribution.
            </p>
          ) : (
            <p>
              <span className="font-medium">Fallback mode</span> — no LLM key detected. Autopilot will store a
              short excerpt with a prominent &ldquo;Read full story&rdquo; attribution link. Set{" "}
              <code className="text-xs bg-light-gray px-1">OPENAI_API_KEY</code> or{" "}
              <code className="text-xs bg-light-gray px-1">AI_GATEWAY_API_KEY</code> to enable AI summaries.
            </p>
          )}
        </div>
      </div>

      {/* Run now */}
      <section className="border border-border p-5">
        <div className="flex items-center justify-between gap-4">
          <div>
            <h2 className="font-serif text-xl font-bold">Run now</h2>
            <p className="text-muted text-sm mt-1">
              Fetch feeds once and create drafts immediately (runs even if the switch is off).
            </p>
          </div>
          <Button variant="gold" onClick={runNow} disabled={running}>
            {running ? <Loader2 className="h-4 w-4 animate-spin" /> : <Play className="h-4 w-4" />}
            {running ? "Running…" : "Run now"}
          </Button>
        </div>

        {summary && (
          <div className="mt-5 border-t border-border pt-5">
            {!summary.ran ? (
              <p className="text-sm text-amber-600">
                {summary.messages.join(" ") || "Run skipped (Autopilot disabled)."}
              </p>
            ) : (
              <div className="space-y-4">
                <div className="grid grid-cols-2 sm:grid-cols-5 gap-3">
                  <Stat label="Fetched" value={summary.fetched} />
                  <Stat label="Created" value={summary.created} highlight />
                  <Stat label="Skipped" value={summary.skipped} />
                  <Stat label="AI / Fallback" value={`${summary.aiUsed} / ${summary.fallbackUsed}`} />
                  <Stat label="Errors" value={summary.errors} />
                </div>

                {summary.createdArticles.length > 0 && (
                  <div>
                    <p className="text-xs uppercase tracking-wider text-muted mb-2">New drafts</p>
                    <div className="border border-border divide-y divide-border">
                      {summary.createdArticles.map((a) => (
                        <Link
                          key={a.id}
                          href={`/admin/articles/${a.id}`}
                          className="flex items-center gap-2 p-3 text-sm hover:bg-light-gray/30"
                        >
                          <FileText className="h-4 w-4 text-muted shrink-0" />
                          <span className="truncate">{a.title}</span>
                          <span className="ml-auto text-xs text-muted">{a.usedAI ? "AI" : "excerpt"}</span>
                        </Link>
                      ))}
                    </div>
                  </div>
                )}

                {summary.messages.length > 0 && (
                  <ul className="text-xs text-muted list-disc pl-5 space-y-0.5">
                    {summary.messages.map((m, i) => (
                      <li key={i}>{m}</li>
                    ))}
                  </ul>
                )}
              </div>
            )}
          </div>
        )}
      </section>

      {/* Settings */}
      <section className="border border-border p-5 space-y-6">
        <h2 className="font-serif text-xl font-bold">Settings</h2>

        <label className="flex items-center gap-3 cursor-pointer">
          <input
            type="checkbox"
            checked={config.enabled}
            onChange={(e) => update("enabled", e.target.checked)}
            className="h-4 w-4 accent-gold"
          />
          <span className="text-sm font-medium">
            Enable scheduled runs (master switch)
          </span>
        </label>
        <p className="-mt-4 text-xs text-muted">
          When off, the scheduled cron endpoint does nothing. &ldquo;Run now&rdquo; still works for testing.
        </p>

        <div className="grid md:grid-cols-3 gap-6">
          <FormField label="Max drafts per run">
            <Input
              type="number"
              min={1}
              max={50}
              value={config.maxItemsPerRun}
              onChange={(e) => update("maxItemsPerRun", Number(e.target.value))}
            />
          </FormField>
          <FormField label="Schedule interval (minutes)" hint="Guidance for your external scheduler">
            <Input
              type="number"
              min={5}
              value={config.scheduleIntervalMinutes}
              onChange={(e) => update("scheduleIntervalMinutes", Number(e.target.value))}
            />
          </FormField>
          <FormField label="Default category">
            <Select
              value={config.defaultCategorySlug}
              onChange={(e) => update("defaultCategorySlug", e.target.value)}
            >
              {categories.map((c) => (
                <option key={c.slug} value={c.slug}>
                  {c.name}
                </option>
              ))}
            </Select>
          </FormField>
        </div>

        <FormField label="Attributed author" hint="Existing author drafts are assigned to">
          <Select
            value={config.defaultAuthorId || ""}
            onChange={(e) => update("defaultAuthorId", e.target.value || undefined)}
          >
            <option value="">First author (default)</option>
            {authors.map((a) => (
              <option key={a.id} value={a.id}>
                {a.name}
              </option>
            ))}
          </Select>
        </FormField>

        {/* Feeds */}
        <div>
          <div className="flex items-center justify-between mb-3">
            <h3 className="font-medium text-sm">RSS feeds</h3>
            <Button type="button" variant="outline" size="sm" onClick={addFeed}>
              <Plus className="h-3.5 w-3.5" /> Add feed
            </Button>
          </div>
          <div className="space-y-3">
            {config.feeds.map((feed, i) => (
              <div key={i} className="grid grid-cols-12 gap-2 items-center border border-border p-3">
                <input
                  type="checkbox"
                  checked={feed.enabled !== false}
                  onChange={(e) => updateFeed(i, { enabled: e.target.checked })}
                  className="col-span-1 h-4 w-4 accent-gold justify-self-center"
                  title="Enable feed"
                />
                <Input
                  className="col-span-3"
                  placeholder="Name"
                  value={feed.name}
                  onChange={(e) => updateFeed(i, { name: e.target.value })}
                />
                <Input
                  className="col-span-5"
                  placeholder="https://example.com/rss.xml"
                  value={feed.url}
                  onChange={(e) => updateFeed(i, { url: e.target.value })}
                />
                <select
                  className="col-span-2 h-10 border border-border bg-background px-2 text-xs"
                  value={feed.category || config.defaultCategorySlug}
                  onChange={(e) => updateFeed(i, { category: e.target.value })}
                >
                  {categories.map((c) => (
                    <option key={c.slug} value={c.slug}>
                      {c.name}
                    </option>
                  ))}
                </select>
                <button
                  type="button"
                  onClick={() => removeFeed(i)}
                  className="col-span-1 justify-self-center text-destructive hover:opacity-70"
                  title="Remove feed"
                >
                  <Trash2 className="h-4 w-4" />
                </button>
              </div>
            ))}
            {config.feeds.length === 0 && (
              <p className="text-sm text-muted">No feeds configured. Add one to get started.</p>
            )}
          </div>
        </div>

        <div className="flex items-center gap-3 pt-2 border-t border-border">
          <Button variant="gold" onClick={save} disabled={saving}>
            {saving ? <Loader2 className="h-4 w-4 animate-spin" /> : <Save className="h-4 w-4" />}
            Save settings
          </Button>
          {savedMsg && <span className="text-sm text-emerald-600">{savedMsg}</span>}
          {error && <span className="text-sm text-destructive">{error}</span>}
        </div>
      </section>

      {/* Scheduling help */}
      <section className="border border-border p-5 text-sm space-y-3">
        <h2 className="font-serif text-xl font-bold">Scheduling</h2>
        <p className="text-muted">
          Automatic runs are driven by any external scheduler hitting the protected cron endpoint. Set{" "}
          <code className="text-xs bg-light-gray px-1">CRON_SECRET</code> in your environment, then add a
          crontab entry (respects the master switch above):
        </p>
        <pre className="bg-navy text-white text-xs p-3 overflow-x-auto rounded-sm">
{`# every ${config.scheduleIntervalMinutes} minutes
*/${config.scheduleIntervalMinutes} * * * * curl -s -X POST -H "x-cron-secret: $CRON_SECRET" http://localhost:3000/api/autopilot/cron >/dev/null 2>&1`}
        </pre>
        <p className="text-muted">
          Or run <code className="text-xs bg-light-gray px-1">npm run autopilot</code> from the project root
          (also uses <code className="text-xs bg-light-gray px-1">CRON_SECRET</code>).
        </p>
      </section>
    </div>
  );
}

function Stat({ label, value, highlight }: { label: string; value: number | string; highlight?: boolean }) {
  return (
    <div className={`border border-border p-3 ${highlight ? "bg-gold/5" : ""}`}>
      <p className="text-[10px] uppercase tracking-wider text-muted">{label}</p>
      <p className="font-serif text-2xl font-bold">{value}</p>
    </div>
  );
}
