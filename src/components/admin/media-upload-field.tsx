"use client";

import { useRef, useState } from "react";
import { Loader2, Upload, X } from "lucide-react";
import { Input } from "@/components/ui/input";
import { acceptAttr, formatBytes, maxBytesFor, type UploadKind } from "@/lib/cms/upload-config";

interface MediaUploadFieldProps {
  kind: UploadKind;
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
  required?: boolean;
}

export function MediaUploadField({ kind, value, onChange, placeholder, required }: MediaUploadFieldProps) {
  const inputRef = useRef<HTMLInputElement>(null);
  const [uploading, setUploading] = useState(false);
  const [error, setError] = useState("");
  const [dragging, setDragging] = useState(false);

  const uploadFile = async (file: File) => {
    setError("");

    const maxBytes = maxBytesFor(kind);
    if (file.size > maxBytes) {
      setError(`File too large. Max size is ${formatBytes(maxBytes)}`);
      return;
    }

    const body = new FormData();
    body.append("file", file);
    body.append("kind", kind);

    setUploading(true);
    try {
      const res = await fetch("/api/admin/upload", {
        method: "POST",
        credentials: "same-origin",
        body,
      });
      const data = await res.json().catch(() => ({}));
      if (!res.ok) {
        setError(data.error || "Upload failed");
        return;
      }
      onChange(data.url);
    } catch {
      setError("Upload failed. Please try again.");
    } finally {
      setUploading(false);
    }
  };

  const handleFiles = (files: FileList | null) => {
    const file = files?.[0];
    if (file) void uploadFile(file);
  };

  return (
    <div className="space-y-3">
      <Input
        type="text"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder || "Paste a URL or upload below"}
        required={required}
      />

      <div
        onDragOver={(e) => {
          e.preventDefault();
          setDragging(true);
        }}
        onDragLeave={() => setDragging(false)}
        onDrop={(e) => {
          e.preventDefault();
          setDragging(false);
          handleFiles(e.dataTransfer.files);
        }}
        onClick={() => inputRef.current?.click()}
        className={`flex cursor-pointer items-center justify-center gap-2 border border-dashed px-3 py-4 text-sm transition-colors ${
          dragging ? "border-gold bg-gold/5" : "border-border hover:border-gold/60"
        }`}
      >
        {uploading ? (
          <>
            <Loader2 className="h-4 w-4 animate-spin" />
            <span className="text-muted">Uploading…</span>
          </>
        ) : (
          <>
            <Upload className="h-4 w-4 text-muted" />
            <span className="text-muted">
              Drag &amp; drop or click to upload {kind === "video" ? "a video" : "an image"}
            </span>
          </>
        )}
        <input
          ref={inputRef}
          type="file"
          accept={acceptAttr(kind)}
          className="hidden"
          onChange={(e) => {
            handleFiles(e.target.files);
            e.target.value = "";
          }}
        />
      </div>

      {error && <p className="text-xs text-destructive">{error}</p>}

      {value && !uploading && (
        <div className="flex items-start gap-3">
          {kind === "video" ? (
            <video src={value} controls className="max-h-40 max-w-full border border-border" />
          ) : (
            // eslint-disable-next-line @next/next/no-img-element
            <img src={value} alt="Preview" className="max-h-40 max-w-full border border-border object-cover" />
          )}
          <button
            type="button"
            onClick={() => onChange("")}
            className="flex items-center gap-1 text-xs text-muted hover:text-destructive"
          >
            <X className="h-3 w-3" /> Clear
          </button>
        </div>
      )}
    </div>
  );
}
