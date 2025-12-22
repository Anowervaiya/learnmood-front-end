import { Skeleton } from "@/components/ui/skeleton"

export function FriendsSkeleton() {
  return (
    <div className="border rounded-lg p-2">
      <div className="flex justify-between">
        <div className="flex items-center gap-2">
          <Skeleton className="h-8 w-8 rounded-full" />
          <div className="space-y-2">
            <Skeleton className="h-4 w-[120px]" />
          </div>
        </div>
        <Skeleton className="h-8 w-8 rounded-full" />
      </div>
    </div>
  )
}