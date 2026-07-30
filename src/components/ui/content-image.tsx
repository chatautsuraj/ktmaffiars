"use client";

import Image, { type ImageProps } from "next/image";
import { useState } from "react";
import { cn } from "@/lib/utils";
import { IMAGE_FALLBACK, resolveImageUrl } from "@/lib/images";

type ContentImageProps = Omit<ImageProps, "src" | "alt"> & {
  src: string;
  alt: string;
};

export function ContentImage({
  src,
  alt,
  className,
  fill,
  width,
  height,
  sizes,
  priority,
  ...props
}: ContentImageProps) {
  const [imgSrc, setImgSrc] = useState(() => resolveImageUrl(src));
  const [failed, setFailed] = useState(false);

  const handleError = () => {
    if (!failed && imgSrc !== IMAGE_FALLBACK) {
      setFailed(true);
      setImgSrc(IMAGE_FALLBACK);
    }
  };

  return (
    <Image
      src={imgSrc}
      alt={alt}
      fill={fill}
      width={width}
      height={height}
      sizes={sizes}
      priority={priority}
      className={cn("object-cover", className)}
      onError={handleError}
      {...props}
    />
  );
}
