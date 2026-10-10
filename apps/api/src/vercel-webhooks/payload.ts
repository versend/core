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

export type VercelWebhook = z.infer<typeof webhookSchema>;

export function metaText(
  meta: Record<string, unknown> | undefined,
  key: string
): string | undefined {
  const value = meta?.[key];
  return typeof value === "string" && value.length > 0 ? value : undefined;
}
