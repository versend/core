const httpScheme = /^https?:\/\//iu;

/**
 * Normalizes a hostname or URL to an absolute http(s) URL.
 *
 * @param value - Candidate string.
 * @returns The result.
 */
export const absoluteHttp = (value: string | undefined): string | undefined => {
  if (!value) {
    return undefined;
  }

  const candidate = httpScheme.test(value) ? value : `https://${value}`;
  try {
    const url = new URL(candidate);
    if (url.protocol !== "https:" && url.protocol !== "http:") {
      return undefined;
    }
    if (url.pathname === "/" && url.search === "" && url.hash === "") {
      return url.origin;
    }
    return url.toString();
  } catch {
    // A deployment hostname or project link that is not a URL is omitted.
    return undefined;
  }
};
