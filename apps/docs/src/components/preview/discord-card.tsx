import { cn } from "@/lib/cn";

import { BuildError } from "./card-parts";
import { sampleProject, toneBar } from "./samples";
import type { EventSample } from "./samples";

/**
 * Discord embed, as a chat message from the Versend app.
 *
 * @param props - Event sample.
 * @returns The card element.
 */
export const DiscordCard = ({ event }: { event: EventSample }) => (
  <div className="flex gap-3 p-4">
    <span className="bg-fd-foreground size-9 shrink-0" />
    <div className="min-w-0 flex-1">
      <p className="text-sm">
        <span className="font-medium">Versend</span>{" "}
        <span className="border-fd-border bg-fd-muted text-2xs ms-1 border px-1 font-mono uppercase">
          app
        </span>
        <span className="text-fd-muted-foreground ms-2 text-xs">Today</span>
      </p>
      <div className="border-fd-border bg-fd-background mt-1.5 flex border">
        <span className={cn("w-1 shrink-0", toneBar[event.tone])} />
        <div className="min-w-0 flex-1 p-3">
          <p className="text-fd-muted-foreground text-xs font-medium">
            {sampleProject}
          </p>
          <p className="mt-1 text-sm font-semibold">{event.title}</p>
          <p className="mt-2 text-sm font-medium">{event.subject}</p>
          {event.body ? (
            <p className="text-fd-muted-foreground border-fd-border mt-1 border-l-2 ps-2 text-sm">
              {event.body}
            </p>
          ) : null}
          <dl className="mt-3 grid grid-cols-3 gap-2 text-xs">
            {[
              ["Environment", event.environment],
              ["Branch", event.branch],
              ["Commit", event.commit],
            ].map(([label, value]) => (
              <div key={label}>
                <dt className="font-medium">{label}</dt>
                <dd className="text-fd-muted-foreground mt-0.5 font-mono">
                  {value}
                </dd>
              </div>
            ))}
          </dl>
          <BuildError event={event} />
          <p className="text-fd-muted-foreground text-2xs mt-3 font-mono">
            {event.id} · {event.type}
          </p>
        </div>
      </div>
    </div>
  </div>
);
