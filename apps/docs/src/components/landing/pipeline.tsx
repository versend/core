import { PipelineDrawing } from "./pipeline-drawing";
import { Eyebrow, Section, SectionContent, SectionTitle } from "./section";

const steps = [
  {
    body: "Every request is checked against WEBHOOK_INTEGRATION_SECRET before anything is parsed. A bad signature is a 401, not a message.",
    index: "01",
    title: "Verify",
  },
  {
    body: "FILTER_EVENTS and FILTER_EVENTS_EXCLUDE pick event types, FILTER_TARGETS picks deployment targets. A per-IP rate limit keeps the relay calm.",
    index: "02",
    title: "Filter",
  },
  {
    body: "The event is turned into one card and posted to every configured destination in parallel. 429s and 5xxs are retried with backoff; one slow channel never blocks another.",
    index: "03",
    title: "Deliver",
  },
] as const;

/**
 * "How it works" section: a line drawing of the relay and the three stages.
 *
 * @returns The section element.
 */
export const Pipeline = () => (
  <Section id="how-it-works">
    <SectionContent>
      <Eyebrow index="01">How it works</Eyebrow>
      <SectionTitle>One request in, one card out per channel.</SectionTitle>
      <p className="text-fd-muted-foreground mt-3 max-w-xl text-base leading-relaxed">
        The relay is a single Bun process behind one route. There is nothing to
        migrate, back up or log into.
      </p>
      <div className="border-fd-border mt-10 border p-4 sm:p-8">
        <PipelineDrawing />
      </div>
      <ol className="divide-fd-border border-fd-border mt-10 grid divide-y border md:grid-cols-3 md:divide-x md:divide-y-0">
        {steps.map((step) => (
          <li className="p-5 sm:p-6" key={step.index}>
            <p className="text-fd-muted-foreground text-2xs font-mono tracking-wider">
              {step.index}
            </p>
            <h3 className="text-fd-foreground mt-2 text-base font-medium">
              {step.title}
            </h3>
            <p className="text-fd-muted-foreground mt-2 text-sm leading-relaxed">
              {step.body}
            </p>
          </li>
        ))}
      </ol>
    </SectionContent>
  </Section>
);
