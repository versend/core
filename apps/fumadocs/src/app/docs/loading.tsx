export default function DocsLoading() {
  return (
    <div className="flex w-full flex-1 flex-col gap-6 lg:flex-row lg:gap-12">
      {/* Main content */}
      <div className="min-w-0 flex-1 space-y-6">
        {/* Title */}
        <div className="h-9 w-2/3 animate-pulse rounded-md bg-fd-muted" />
        {/* Description */}
        <div className="h-4 max-w-xl animate-pulse rounded bg-fd-muted/80" />
        {/* Divider (matches DocsBody + action bar area) */}
        <div className="border-fd-border border-b pt-2 pb-6" />
        {/* Body prose skeleton */}
        <div className="space-y-4">
          <div className="h-4 w-full animate-pulse rounded bg-fd-muted/60" />
          <div className="h-4 w-[95%] animate-pulse rounded bg-fd-muted/60" />
          <div className="h-4 w-4/5 animate-pulse rounded bg-fd-muted/60" />
          <div className="h-4 w-full animate-pulse rounded bg-fd-muted/60" />
          <div className="h-4 w-3/4 animate-pulse rounded bg-fd-muted/60" />
          <div className="h-4 w-5/6 animate-pulse rounded bg-fd-muted/60" />
          <div className="h-4 w-2/3 animate-pulse rounded bg-fd-muted/60" />
        </div>
      </div>
      {/* TOC sidebar skeleton */}
      <aside aria-hidden className="hidden shrink-0 lg:block lg:w-52 xl:w-56">
        <div className="sticky top-24 space-y-2">
          <div className="h-4 w-20 animate-pulse rounded bg-fd-muted/60" />
          <div className="h-3 w-full animate-pulse rounded bg-fd-muted/50" />
          <div className="h-3 w-4/5 animate-pulse rounded bg-fd-muted/50" />
          <div className="h-3 w-full animate-pulse rounded bg-fd-muted/50" />
          <div className="h-3 w-3/4 animate-pulse rounded bg-fd-muted/50" />
          <div className="h-3 w-5/6 animate-pulse rounded bg-fd-muted/50" />
        </div>
      </aside>
    </div>
  );
}
