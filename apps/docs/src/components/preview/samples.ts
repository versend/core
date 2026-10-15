/**
 * Outcome class a sample event is drawn with.
 */
export type SampleTone = "failure" | "progress" | "success";

/**
 * One Vercel event, reduced to the fields every preview card shows.
 */
export interface EventSample {
  body?: string;
  branch: string;
  buildError?: string;
  commit: string;
  environment: string;
  id: string;
  mark: string;
  subject: string;
  title: string;
  tone: SampleTone;
  type: string;
}

export const sampleProject = "acme-web";

const startedEvent: EventSample = {
  branch: "main",
  commit: "a1b2c3d",
  environment: "production",
  id: "dpl_8f2a",
  mark: "⏳",
  subject: "Ship the billing page",
  title: "Deployment started",
  tone: "progress",
  type: "deployment.created",
};

export const readyEvent: EventSample = {
  body: "Invoice download and the failed-payment state.",
  branch: "main",
  commit: "a1b2c3d",
  environment: "production",
  id: "dpl_8f2a",
  mark: "✅",
  subject: "Ship the billing page",
  title: "Deployment ready",
  tone: "success",
  type: "deployment.succeeded",
};

const failedEvent: EventSample = {
  branch: "feat/webhooks",
  buildError: "Type error: Property 'amount' is missing in type 'Invoice'.",
  commit: "9e8d7c6",
  environment: "preview",
  id: "dpl_41c0",
  mark: "❌",
  subject: "Retry failed webhooks",
  title: "Deployment failed",
  tone: "failure",
  type: "deployment.error",
};

export const sampleEvents = [startedEvent, readyEvent, failedEvent];

export const toneBar: Record<SampleTone, string> = {
  failure: "bg-fd-error",
  progress: "bg-fd-warning",
  success: "bg-fd-success",
};

export const toneText: Record<SampleTone, string> = {
  failure: "text-fd-error",
  progress: "text-fd-warning",
  success: "text-fd-success",
};
