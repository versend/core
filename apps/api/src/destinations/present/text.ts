const httpScheme = /^https?:\/\//i;

export function clip(value: string, max: number): string {
  const trimmed = value.trim();
  if (trimmed.length <= max) {
    return trimmed;
  }

  return `${trimmed.slice(0, Math.max(0, max - 1))}…`;
}

export function absoluteHttp(value: string | undefined): string | undefined {
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
}

export function splitMessage(message: string): {
  subject: string;
  body?: string;
} {
  const normalized = message.replaceAll("\r\n", "\n").trim();
  const breakAt = normalized.indexOf("\n");
  const subject = clip(
    breakAt === -1 ? normalized : normalized.slice(0, breakAt),
    200
  );
  const rest = breakAt === -1 ? "" : normalized.slice(breakAt + 1).trim();
  if (!(subject.length > 0)) {
    return { subject: "" };
  }

  return {
    body: rest.length > 0 ? clip(rest, 700) : undefined,
    subject,
  };
}
