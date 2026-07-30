"use client";

import Link from "next/link";
import type { Author } from "@/types";
import { ContentImage } from "@/components/ui/content-image";

interface AuthorCardProps {
  author: Author;
  variant?: "default" | "compact";
}

export function AuthorCard({ author, variant = "default" }: AuthorCardProps) {
  if (variant === "compact") {
    return (
      <Link href={`/author/${author.slug}`} className="flex items-center gap-3 group">
        <div className="relative w-10 h-10 rounded-full overflow-hidden shrink-0 bg-light-gray">
          <ContentImage src={author.avatar} alt={author.name} fill sizes="40px" />
        </div>
        <div>
          <p className="text-sm font-medium group-hover:text-gold transition-colors">{author.name}</p>
          <p className="text-xs text-muted">{author.title}</p>
        </div>
      </Link>
    );
  }

  return (
    <div className="flex flex-col sm:flex-row gap-6 card-elevated p-6">
      <div className="relative w-24 h-24 rounded-full overflow-hidden shrink-0 mx-auto sm:mx-0 bg-light-gray ring-1 ring-border">
        <ContentImage src={author.avatar} alt={author.name} fill sizes="96px" />
      </div>
      <div className="text-center sm:text-left min-w-0">
        <Link href={`/author/${author.slug}`}>
          <h3 className="font-serif text-xl font-semibold hover:text-gold transition-colors">{author.name}</h3>
        </Link>
        <p className="text-sm text-gold mt-0.5">{author.title}</p>
        <p className="text-sm text-muted mt-3 leading-relaxed">{author.bio}</p>
        <div className="flex flex-wrap gap-2 mt-3 justify-center sm:justify-start">
          {author.expertise.map((tag) => (
            <span key={tag} className="text-xs px-2 py-0.5 bg-navy/5 dark:bg-gold/10 text-muted rounded-sm">
              {tag}
            </span>
          ))}
        </div>
      </div>
    </div>
  );
}
