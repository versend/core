import { metaText } from "@/vercel-webhooks/payload";
import type { WebhookMeta } from "@/vercel-webhooks/payload";

const githubName = /^[\w.-]+$/u;
const gitSha = /^[a-f0-9]{7,40}$/iu;
const shortShaLength = 7;

/**
 * Commit shown on a notification.
 */
export interface NotificationCommit {
  author?: string;
  short: string;
  url?: string;
}

const githubCommitUrl = (
  org: string | undefined,
  repo: string | undefined,
  sha: string
): string | undefined => {
  if (!(org && repo && githubName.test(org) && githubName.test(repo))) {
    return undefined;
  }
  if (!gitSha.test(sha)) {
    return undefined;
  }
  return `https://github.com/${org}/${repo}/commit/${sha}`;
};

/**
 * Reads the GitHub commit from deployment meta.
 *
 * @param meta - Deployment meta.
 * @returns The result.
 */
export const notificationCommit = (
  meta: WebhookMeta | undefined
): NotificationCommit | undefined => {
  const sha = metaText(meta, "githubCommitSha");
  if (!sha) {
    return undefined;
  }

  const org = metaText(meta, "githubCommitOrg") ?? metaText(meta, "githubOrg");
  const repo =
    metaText(meta, "githubCommitRepo") ?? metaText(meta, "githubRepo");
  const author =
    metaText(meta, "githubCommitAuthorLogin") ??
    metaText(meta, "githubCommitAuthorName");

  return {
    author,
    short: sha.slice(0, shortShaLength),
    url: githubCommitUrl(org, repo, sha),
  };
};
