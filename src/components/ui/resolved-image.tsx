import Image, { type ImageProps } from "next/image";
import { resolveImageUrl } from "@/lib/images";
import { cn } from "@/lib/utils";

type ResolvedImageProps = Omit<ImageProps, "src"> & {
  src: string;
};

/** Server-safe image with broken URL mapping applied at render time */
export function ResolvedImage({ src, className, alt, ...props }: ResolvedImageProps) {
  return (
    <Image
      src={resolveImageUrl(src)}
      alt={alt}
      className={cn("object-cover", className)}
      {...props}
    />
  );
}
