import { BuildError, Meta } from "./card-parts";
import { sampleProject } from "./samples";
import type { EventSample, SampleTone } from "./samples";

const priorityByTone: Record<SampleTone, string> = {
  failure: "urgent",
  progress: "high",
  success: "default",
};

/**
 * ntfy push with its priority and action buttons.
 *
 * @param props - Event sample.
 * @returns The card element.
 */
export const NtfyCard = ({ event }: { event: EventSample }) => (
  <div className="p-4">
    <div className="border-fd-border bg-fd-background border p-3 text-sm">
      <p className="text-fd-muted-foreground text-2xs flex items-center justify-between font-mono">
        <span>versend</span>
        <span>{priorityByTone[event.tone]}</span>
      </p>
      <p className="mt-2 font-semibold">
        {sampleProject} · {event.title}
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
      <div className="mt-3 flex gap-2">
        <span className="border-fd-border border px-2 py-1 text-xs">Open</span>
        <span className="border-fd-border border px-2 py-1 text-xs">
          Inspect
        </span>
      </div>
    </div>
  </div>
);
