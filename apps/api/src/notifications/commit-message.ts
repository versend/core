import { clip } from "./clip";

const subjectLength = 200;
const bodyLength = 700;

/**
 * Commit message split into its first line and the rest.
 */
export interface CommitMessage {
  subject: string;
  body?: string;
}

/**
 * Splits a commit message into a subject and body.
 *
 * @param message - Commit message.
 * @returns The result.
 */
export const splitCommitMessage = (message: string): CommitMessage => {
  const normalized = message.replaceAll("\r\n", "\n").trim();
  const breakAt = normalized.indexOf("\n");
  const subject = clip(
    breakAt === -1 ? normalized : normalized.slice(0, breakAt),
    subjectLength
  );
  const rest = breakAt === -1 ? "" : normalized.slice(breakAt + 1).trim();
  if (subject.length === 0) {
    return { subject: "" };
  }

  return {
    body: rest.length > 0 ? clip(rest, bodyLength) : undefined,
    subject,
  };
};
