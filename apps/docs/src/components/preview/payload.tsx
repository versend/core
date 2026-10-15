import { sampleProject } from "./samples";
import type { EventSample } from "./samples";

/**
 * Abridged webhook body for the selected event.
 *
 * @param props - Event sample.
 * @returns The pre element.
 */
export const Payload = ({ event }: { event: EventSample }) => (
  <pre className="overflow-x-auto px-4 py-3.5 font-mono text-xs leading-relaxed">
    <span className="text-fd-muted-foreground">{"{\n"}</span>
    {[
      ["type", event.type],
      ["id", event.id],
      ["project", sampleProject],
      ["target", event.environment],
      ["branch", event.branch],
      ["commit", event.commit],
      ["message", event.subject],
    ].map(([key, value]) => (
      <span className="block ps-4" key={key}>
        <span className="text-fd-muted-foreground">{`"${key}"`}</span>
        <span className="text-fd-muted-foreground">: </span>
        <span className="text-fd-foreground">{`"${value}"`}</span>
        <span className="text-fd-muted-foreground">,</span>
      </span>
    ))}
    <span className="text-fd-muted-foreground block ps-4">…</span>
    <span className="text-fd-muted-foreground">{"}"}</span>
  </pre>
);
