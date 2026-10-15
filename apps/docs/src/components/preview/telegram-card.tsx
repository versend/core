import { BuildError, Links, Meta } from "./card-parts";
import { sampleProject } from "./samples";
import type { EventSample } from "./samples";

/**
 * Telegram HTML message bubble.
 *
 * @param props - Event sample.
 * @returns The card element.
 */
export const TelegramCard = ({ event }: { event: EventSample }) => (
  <div className="p-4">
    <div className="border-fd-border bg-fd-background max-w-sm border p-3 text-sm">
      <p className="font-semibold">
        {event.mark} {event.title}
      </p>
      <p className="mt-2 font-semibold">{sampleProject}</p>
      <Meta event={event} />
      <p className="border-fd-border mt-2 border-l-2 ps-2">
        <span className="font-medium">{event.subject}</span>
        {event.body ? (
          <span className="text-fd-muted-foreground block">{event.body}</span>
        ) : null}
      </p>
      <BuildError event={event} />
      <Links />
      <p className="text-fd-muted-foreground text-2xs mt-1 text-end font-mono">
        14:02
      </p>
    </div>
  </div>
);
