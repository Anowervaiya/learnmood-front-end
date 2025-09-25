import { Skeleton } from "@/components/ui/skeleton";

export function PostLoading() {
  return (
    <div className="p-4 mb-2 bg-white dark:bg-gray-800 rounded-lg shadow animate-pulse">
      {/* Header (Avatar + Name) */}
      <div className="flex items-center gap-3 mb-2">
        <Skeleton className="h-10 w-10 rounded-full" />
        <Skeleton className="h-4 w-1/3 rounded" />
      </div>

      {/* Content */}
      <Skeleton className="h-4 w-full mb-1" />
      <Skeleton className="h-4 w-full mb-1" />
      <Skeleton className="h-4 w-3/4 mb-2" />

      {/* Media placeholder */}
      <Skeleton className="h-48 w-full rounded-lg" />
    </div>
  );
}

export default PostLoading;
