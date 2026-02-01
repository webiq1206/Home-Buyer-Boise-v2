import { Skeleton } from "@/components/ui/skeleton";

export default function Loading() {
  return (
    <div className="min-h-screen">
      {/* Header skeleton */}
      <div className="sticky top-0 z-50 w-full border-b bg-background">
        <div className="container flex h-20 items-center justify-between px-8">
          <Skeleton className="h-10 w-40" />
          <div className="hidden lg:flex items-center gap-4">
            <Skeleton className="h-8 w-16" />
            <Skeleton className="h-8 w-16" />
            <Skeleton className="h-8 w-16" />
            <Skeleton className="h-8 w-16" />
          </div>
          <Skeleton className="h-9 w-32" />
        </div>
      </div>

      {/* Hero skeleton */}
      <div className="bg-gradient-to-br from-navy to-primary py-20">
        <div className="container px-4">
          <Skeleton className="h-12 w-3/4 max-w-2xl mb-6 bg-white/20" />
          <Skeleton className="h-6 w-2/3 max-w-xl mb-4 bg-white/20" />
          <Skeleton className="h-6 w-1/2 max-w-md mb-8 bg-white/20" />
          <div className="flex gap-4">
            <Skeleton className="h-12 w-40 bg-white/20" />
            <Skeleton className="h-12 w-40 bg-white/20" />
          </div>
        </div>
      </div>

      {/* Content skeleton */}
      <div className="py-16">
        <div className="container px-4">
          <div className="max-w-3xl mx-auto space-y-6">
            <Skeleton className="h-8 w-48" />
            <Skeleton className="h-4 w-full" />
            <Skeleton className="h-4 w-full" />
            <Skeleton className="h-4 w-3/4" />
          </div>
        </div>
      </div>
    </div>
  );
}
