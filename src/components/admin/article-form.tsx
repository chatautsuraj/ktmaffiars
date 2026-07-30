"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { Loader2, Save } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { FormField, Textarea, Select } from "@/components/admin/form-fields";
import { MediaUploadField } from "@/components/admin/media-upload-field";
import type { Article, ArticleStatus, Author, Category } from "@/types";
import { slugify } from "@/lib/utils";

interface ArticleFormProps {
  initialData?: Partial<Article>;
  isNew?: boolean;
}

export function ArticleForm({ initialData, isNew }: ArticleFormProps) {
  const router = useRouter();
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState("");
  const [categories, setCategories] = useState<Category[]>([]);
  const [authors, setAuthors] = useState<Author[]>([]);

  const [form, setForm] = useState({
    title: initialData?.title || "",
    slug: initialData?.slug || "",
    subtitle: initialData?.subtitle || "",
    excerpt: initialData?.excerpt || "",
    content: initialData?.content || "",
    featuredImage: initialData?.featuredImage || "",
    categoryId: initialData?.category?.id || "",
    authorId: initialData?.author?.id || "",
    publishedAt: initialData?.publishedAt
      ? initialData.publishedAt.slice(0, 16)
      : new Date().toISOString().slice(0, 16),
    readingTime: String(initialData?.readingTime || 5),
    tags: (initialData?.tags || []).join(", "),
    status: initialData?.status || "published",
    sourceName: initialData?.sourceName || "",
    sourceUrl: initialData?.sourceUrl || "",
    isPremium: initialData?.isPremium || false,
    isBreaking: initialData?.isBreaking || false,
    isFeatured: initialData?.isFeatured || false,
  });

  useEffect(() => {
    Promise.all([
      fetch("/api/admin/categories").then((r) => r.json()),
      fetch("/api/admin/authors").then((r) => r.json()),
    ]).then(([cats, auths]) => {
      setCategories(cats);
      setAuthors(auths);
    });
  }, []);

  const update = (key: string, value: string | boolean) => {
    setForm((prev) => ({ ...prev, [key]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSaving(true);
    setError("");

    const category = categories.find((c) => c.id === form.categoryId);
    const author = authors.find((a) => a.id === form.authorId);

    if (!category || !author) {
      setError("Please select a category and author");
      setSaving(false);
      return;
    }

    const payload = {
      id: initialData?.id || crypto.randomUUID(),
      title: form.title,
      slug: form.slug || slugify(form.title),
      subtitle: form.subtitle || undefined,
      excerpt: form.excerpt,
      content: form.content,
      featuredImage: form.featuredImage,
      category,
      author,
      publishedAt: new Date(form.publishedAt).toISOString(),
      readingTime: Number(form.readingTime) || 5,
      tags: form.tags.split(",").map((t) => t.trim()).filter(Boolean),
      status: form.status,
      // Preserve provenance markers set by Autopilot when editing.
      source: initialData?.source || "manual",
      sourceName: form.sourceName || undefined,
      sourceUrl: form.sourceUrl || undefined,
      sourceGuid: initialData?.sourceGuid,
      isPremium: form.isPremium,
      isBreaking: form.isBreaking,
      isFeatured: form.isFeatured,
    };

    const url = isNew ? "/api/admin/articles" : `/api/admin/articles/${initialData?.id}`;
    const method = isNew ? "POST" : "PUT";

    const res = await fetch(url, {
      method,
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload),
    });

    setSaving(false);
    if (!res.ok) {
      const data = await res.json().catch(() => ({}));
      setError(data.error || "Failed to save article");
      return;
    }

    router.push("/admin/articles");
    router.refresh();
  };

  return (
    <form onSubmit={handleSubmit} className="max-w-4xl space-y-6">
      <div className="grid md:grid-cols-2 gap-6">
        <FormField label="Title" hint="Headline shown on the site">
          <Input value={form.title} onChange={(e) => update("title", e.target.value)} required />
        </FormField>
        <FormField label="Slug" hint="URL path — auto-generated if empty">
          <Input value={form.slug} onChange={(e) => update("slug", e.target.value)} placeholder="my-article-slug" />
        </FormField>
      </div>

      <FormField label="Subtitle">
        <Input value={form.subtitle} onChange={(e) => update("subtitle", e.target.value)} />
      </FormField>

      <FormField label="Excerpt" hint="Short summary for cards and SEO">
        <Textarea value={form.excerpt} onChange={(e) => update("excerpt", e.target.value)} rows={3} required />
      </FormField>

      <FormField label="Content" hint="HTML supported — use <p>, <h2>, <blockquote> tags">
        <Textarea
          value={form.content}
          onChange={(e) => update("content", e.target.value)}
          rows={16}
          className="font-mono text-xs"
          required
        />
      </FormField>

      <FormField label="Featured Image" hint="Paste a URL or upload an image">
        <MediaUploadField
          kind="image"
          value={form.featuredImage}
          onChange={(value) => update("featuredImage", value)}
          required
        />
      </FormField>

      <div className="grid md:grid-cols-2 gap-6">
        <FormField label="Category">
          <Select value={form.categoryId} onChange={(e) => update("categoryId", e.target.value)} required>
            <option value="">Select category...</option>
            {categories.map((c) => (
              <option key={c.id} value={c.id}>{c.name}</option>
            ))}
          </Select>
        </FormField>
        <FormField label="Author">
          <Select value={form.authorId} onChange={(e) => update("authorId", e.target.value)} required>
            <option value="">Select author...</option>
            {authors.map((a) => (
              <option key={a.id} value={a.id}>{a.name}</option>
            ))}
          </Select>
        </FormField>
      </div>

      <div className="grid md:grid-cols-3 gap-6">
        <FormField label="Published">
          <Input type="datetime-local" value={form.publishedAt} onChange={(e) => update("publishedAt", e.target.value)} />
        </FormField>
        <FormField label="Reading Time (min)">
          <Input type="number" value={form.readingTime} onChange={(e) => update("readingTime", e.target.value)} min={1} />
        </FormField>
        <FormField label="Tags" hint="Comma-separated">
          <Input value={form.tags} onChange={(e) => update("tags", e.target.value)} placeholder="Nepal, Diplomacy" />
        </FormField>
      </div>

      <FormField
        label="Status"
        hint="Drafts stay hidden from the public site until set to Published."
      >
        <Select value={form.status} onChange={(e) => update("status", e.target.value as ArticleStatus)}>
          <option value="published">Published (visible on site)</option>
          <option value="draft">Draft (hidden from public)</option>
        </Select>
      </FormField>

      <div className="grid md:grid-cols-2 gap-6">
        <FormField label="Source Name" hint="Optional attribution — original outlet">
          <Input value={form.sourceName} onChange={(e) => update("sourceName", e.target.value)} placeholder="Reuters" />
        </FormField>
        <FormField label="Source URL" hint="Optional link back to the original story">
          <Input value={form.sourceUrl} onChange={(e) => update("sourceUrl", e.target.value)} placeholder="https://..." />
        </FormField>
      </div>

      <div className="flex flex-wrap gap-6">
        {(["isFeatured", "isBreaking", "isPremium"] as const).map((key) => (
          <label key={key} className="flex items-center gap-2 cursor-pointer">
            <input
              type="checkbox"
              checked={form[key]}
              onChange={(e) => update(key, e.target.checked)}
              className="h-4 w-4 accent-gold"
            />
            <span className="text-sm capitalize">{key.replace("is", "")}</span>
          </label>
        ))}
      </div>

      {error && <p className="text-sm text-destructive">{error}</p>}

      <div className="flex gap-3 pt-4 border-t border-border">
        <Button type="submit" variant="gold" disabled={saving}>
          {saving ? <Loader2 className="h-4 w-4 animate-spin" /> : <Save className="h-4 w-4" />}
          {isNew ? "Publish Article" : "Save Changes"}
        </Button>
        <Button type="button" variant="outline" onClick={() => router.back()}>
          Cancel
        </Button>
      </div>
    </form>
  );
}
