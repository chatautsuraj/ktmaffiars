import { GridSkeleton } from "@/components/shared/skeletons";

export default function Loading() {
  return (
    <div className="container mx-auto px-4 py-12">
      <GridSkeleton count={6} />
    </div>
  );
}
