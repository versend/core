import { z } from "zod";

import { vercelEventNames } from "./event-names";

const metaSchema = z.record(z.string(), z.unknown());

const deploymentSchema = z
  .object({
    id: z.string().optional(),
    inspectorUrl: z.string().optional(),
    meta: metaSchema.optional(),
    name: z.string().optional(),
    url: z.string().optional(),
  })
  .loose();

const namedSchema = z
  .object({
    id: z.string(),
    name: z.string().optional(),
  })
  .loose();

export const webhookSchema = z
  .object({
    createdAt: z.number(),
    id: z.string(),
    payload: z
      .object({
        deployment: deploymentSchema.optional(),
        domain: z
          .object({
            name: z.string().optional(),
          })
          .loose()
          .optional(),
        links: z
          .object({
            deployment: z.string().optional(),
            project: z.string().optional(),
          })
          .loose()
          .optional(),
        project: namedSchema.optional(),
        target: z.string().nullable().optional(),
      })
      .loose(),
    type: z.enum(vercelEventNames),
  })
  .loose();

/**
 * Parsed Vercel webhook.
 */
export type VercelWebhook = z.infer<typeof webhookSchema>;
/**
 * Deployment meta carried on a webhook.
 */
export type WebhookMeta = z.infer<typeof metaSchema>;

const metaString = z.string().min(1);

/**
 * Reads a non-empty string field from deployment meta.
 *
 * @param meta - Deployment meta.
 * @param key - Meta field name.
 * @returns The result.
 */
export const metaText = (
  meta: WebhookMeta | undefined,
  key: string
): string | undefined => {
  const parsed = metaString.safeParse(meta?.[key]);
  return parsed.success ? parsed.data : undefined;
};
