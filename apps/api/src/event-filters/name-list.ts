/**
 * Parses a comma-separated filter value.
 *
 * @param value - Raw environment value.
 * @returns The names, or null when the filter is unset.
 */
export const nameList = (value: string | undefined): Set<string> | null => {
  const names = value
    ?.split(",")
    .map((name) => name.trim())
    .filter((name) => name.length > 0);
  if (!names || names.length === 0) {
    return null;
  }

  return new Set(names);
};
