"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Loader2, Save } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { FormField, Textarea, Select } from "@/components/admin/form-fields";
import { MediaUploadField } from "@/components/admin/media-upload-field";
import type { CmsCollection } from "@/lib/cms/collections";
import { COLLECTION_FIELDS, type FieldSchema } from "@/lib/cms/field-schemas";
import { slugify } from "@/lib/utils";

interface CollectionFormProps {
  collection: CmsCollection;
  initialData?: Record<string, unknown>;
  isNew?: boolean;
}

// Converts a stored date value (ISO string or date-only) into the
// `YYYY-MM-DDTHH:mm` format required by <input type="datetime-local">.
function toDateTimeLocal(value: unknown): string {
  if (typeof value !== "string" || value.trim() === "") return "";
  const s = value.trim();
  if (/^\d{4}-\d{2}-\d{2}$/.test(s)) return `${s}T00:00`;
  if (s.includes("T")) return s.slice(0, 16);
  const parsed = new Date(s);
  return isNaN(parsed.getTime()) ? "" : parsed.toISOString().slice(0, 16);
}

function toFormValue(value: unknown, type: FieldSchema["type"]): string | boolean {
  if (type === "checkbox") return Boolean(value);
  if (value === undefined || value === null) return "";
  if (type === "date") return toDateTimeLocal(value);
  if (type === "tags" && Array.isArray(value)) return value.join(", ");
  if (type === "json" && typeof value === "object") return JSON.stringify(value, null, 2);
  return String(value);
}

function fromFormValue(raw: string | boolean, type: FieldSchema["type"]): unknown {
  if (type === "checkbox") return raw === true;
  if (type === "number") return raw === "" ? 0 : Number(raw);
  if (type === "date") {
    const s = String(raw).trim();
    if (!s) return "";
    const parsed = new Date(s);
    return isNaN(parsed.getTime()) ? s : parsed.toISOString();
  }
  if (type === "tags") {
    return String(raw)
      .split(",")
      .map((s) => s.trim())
      .filter(Boolean);
  }
  if (type === "json") {
    if (!raw || String(raw).trim() === "") return type === "json" ? {} : [];
    try {
      return JSON.parse(String(raw));
    } catch {
      return {};
    }
  }
  return raw;
}

export function CollectionForm({ collection, initialData = {}, isNew }: CollectionFormProps) {
  const router = useRouter();
  const fields = COLLECTION_FIELDS[collection] || [];
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState("");

  const [form, setForm] = useState<Record<string, string | boolean>>(() => {
    const state: Record<string, string | boolean> = {};
    fields.forEach((field) => {
      state[field.key] = toFormValue(initialData[field.key], field.type);
    });
    return state;
  });

  const update = (key: string, value: string | boolean) => {
    setForm((prev) => ({ ...prev, [key]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSaving(true);
    setError("");

    const payload: Record<string, unknown> = { ...initialData };
    fields.forEach((field) => {
      payload[field.key] = fromFormValue(form[field.key], field.type);
    });

    const titleField = payload.title || payload.name;
    if (!payload.slug && titleField) {
      payload.slug = slugify(String(titleField));
    }

    if (!payload.id) {
      payload.id = crypto.randomUUID();
    }

    const url = isNew
      ? `/api/admin/${collection}`
      : `/api/admin/${collection}/${initialData.id}`;
    const method = isNew ? "POST" : "PUT";

    const res = await fetch(url, {
      method,
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload),
    });

    setSaving(false);
    if (!res.ok) {
      const data = await res.json().catch(() => ({}));
      setError(data.error || "Failed to save");
      return;
    }

    router.push(`/admin/${collection}`);
    router.refresh();
  };

  return (
    <form onSubmit={handleSubmit} className="max-w-3xl space-y-6">
      {fields.map((field) => (
        <FormField key={field.key} label={field.label} hint={field.hint}>
          {field.type === "image" || field.type === "video" ? (
            <MediaUploadField
              kind={field.type}
              value={String(form[field.key] ?? "")}
              onChange={(value) => update(field.key, value)}
              placeholder={field.placeholder}
              required={field.required}
            />
          ) : field.type === "textarea" ? (
            <Textarea
              value={String(form[field.key] ?? "")}
              onChange={(e) => update(field.key, e.target.value)}
              rows={field.rows || 4}
              placeholder={field.placeholder}
              required={field.required}
            />
          ) : field.type === "select" ? (
            <Select
              value={String(form[field.key] ?? "")}
              onChange={(e) => update(field.key, e.target.value)}
              required={field.required}
            >
              <option value="">Select...</option>
              {field.options?.map((opt) => (
                <option key={opt.value} value={opt.value}>
                  {opt.label}
                </option>
              ))}
            </Select>
          ) : field.type === "checkbox" ? (
            <label className="flex items-center gap-2 cursor-pointer">
              <input
                type="checkbox"
                checked={Boolean(form[field.key])}
                onChange={(e) => update(field.key, e.target.checked)}
                className="h-4 w-4 accent-gold"
              />
              <span className="text-sm text-muted">Enabled</span>
            </label>
          ) : (
            <Input
              type={field.type === "number" ? "number" : field.type === "date" ? "datetime-local" : "text"}
              value={String(form[field.key] ?? "")}
              onChange={(e) => update(field.key, e.target.value)}
              placeholder={field.placeholder}
              required={field.required}
            />
          )}
        </FormField>
      ))}

      {error && <p className="text-sm text-destructive">{error}</p>}

      <div className="flex gap-3 pt-4 border-t border-border">
        <Button type="submit" variant="gold" disabled={saving}>
          {saving ? <Loader2 className="h-4 w-4 animate-spin" /> : <Save className="h-4 w-4" />}
          {isNew ? "Create" : "Save Changes"}
        </Button>
        <Button type="button" variant="outline" onClick={() => router.back()}>
          Cancel
        </Button>
      </div>
    </form>
  );
}
