import { docsLlms } from "@/lib/source";

export const revalidate = false;

/**
 * Serves the generated document.
 *
 * @returns The result.
 */
export const GET = async () => new Response(await docsLlms.full());
