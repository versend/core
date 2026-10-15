/**
 * Treats a blank environment value as unset.
 *
 * @param value - Candidate string.
 * @returns The result.
 */
export const present = (value: string | undefined): value is string =>
  typeof value === "string" && value.trim().length > 0;
