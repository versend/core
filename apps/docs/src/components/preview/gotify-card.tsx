import { BuildError, Meta } from "./card-parts";
import { sampleProject } from "./samples";
import type { EventSample } from "./samples";

/**
 * Gotify message as listed in the Gotify client.
 *
 * @param props - Event sample.
 * @returns The card element.
 */
export const GotifyCard = ({ event }: { event: EventSample }) => (
  <div className="p-4">
    <div className="border-fd-border bg-fd-background flex gap-3 border p-3 text-sm">
      <span className="bg-fd-foreground size-8 shrink-0" />
      <div className="min-w-0 flex-1">
        <p className="flex items-baseline justify-between gap-3">
          <span className="font-semibold">
            {sampleProject} · {event.title}
          </span>
          <span className="text-fd-muted-foreground text-2xs font-mono">
            just now
          </span>
        </p>
        <p className="mt-2">
          {event.mark} <span className="font-semibold">{sampleProject}</span>
        </p>
        <p className="mt-1">
          <Meta event={event} />
        </p>
        <p className="border-fd-border mt-2 border-l-2 ps-2 font-medium">
          {event.subject}
        </p>
        <BuildError event={event} />
        <p className="text-fd-muted-foreground text-2xs mt-3 font-mono">
          {event.id} · {event.type}
        </p>
      </div>
    </div>
  </div>
);
