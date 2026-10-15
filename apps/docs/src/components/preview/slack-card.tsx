import { BuildError, Links, Meta } from "./card-parts";
import { sampleProject, toneText } from "./samples";
import type { EventSample } from "./samples";

/**
 * Slack attachment with the colored status bar.
 *
 * @param props - Event sample.
 * @returns The card element.
 */
export const SlackCard = ({ event }: { event: EventSample }) => (
  <div className="flex gap-3 p-4">
    <span className="bg-fd-foreground size-9 shrink-0" />
    <div className="min-w-0 flex-1 text-sm">
      <p>
        <span className="font-semibold">Versend</span>{" "}
        <span className="border-fd-border bg-fd-muted text-2xs border px-1 font-mono uppercase">
          app
        </span>
        <span className="text-fd-muted-foreground ms-2 text-xs">2:02 PM</span>
      </p>
      <div className="border-fd-border mt-1.5 flex border-l-2">
        <div className="min-w-0 flex-1 ps-3">
          <p className="font-semibold">
            <span className={toneText[event.tone]}>■</span> {event.title}
          </p>
          <p className="text-fd-muted-foreground mt-0.5 text-xs">
            {sampleProject}
          </p>
          <p className="mt-2 font-medium">{event.subject}</p>
          {event.body ? (
            <p className="text-fd-muted-foreground">{event.body}</p>
          ) : null}
          <p className="mt-2">
            <Meta event={event} />
          </p>
          <BuildError event={event} />
          <Links />
        </div>
      </div>
    </div>
  </div>
);
