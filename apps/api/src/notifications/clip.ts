/**
 * Trims a string to a maximum length, ending with an ellipsis when cut.
 *
 * @param value - Candidate string.
 * @param max - Maximum length.
 * @returns The result.
 */
export const clip = (value: string, max: number): string => {
  const trimmed = value.trim();
  if (trimmed.length <= max) {
    return trimmed;
  }

  return `${trimmed.slice(0, Math.max(0, max - 1))}…`;
};
