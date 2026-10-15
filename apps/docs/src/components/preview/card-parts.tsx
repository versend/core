import type { EventSample } from "./samples";

/**
 * Environment, branch and commit on one mono line.
 *
 * @param props - Event sample.
 * @returns The meta element.
 */
export const Meta = ({ event }: { event: EventSample }) => (
  <span className="text-fd-muted-foreground font-mono text-xs">
    {event.environment} · {event.branch} · {event.commit}
  </span>
);

/**
 * Build error block, rendered only for failed deployments.
 *
 * @param props - Event sample.
 * @returns The error element, or nothing.
 */
export const BuildError = ({ event }: { event: EventSample }) =>
  event.buildError ? (
    <pre className="border-fd-border bg-fd-muted mt-3 overflow-x-auto border px-3 py-2 font-mono text-xs whitespace-pre-wrap">
      {event.buildError}
    </pre>
  ) : null;

/**
 * Open and Inspect links as they appear in text destinations.
 *
 * @returns The links element.
 */
export const Links = () => (
  <p className="text-fd-foreground mt-3 text-xs underline decoration-dashed underline-offset-4">
    Open · Inspect
  </p>
);
