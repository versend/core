const maxAttempts = 3;

export function sendWithRetry(
  request: () => Promise<Response>,
  attempt = 0
): Promise<Response> {
  return request().then(async (response) => {
    const retryable = response.status === 429 || response.status >= 500;
    if (response.ok || !retryable || attempt === maxAttempts - 1) {
      if (!response.ok) {
        throw new Error(`destination responded ${response.status}`);
      }
      return response;
    }

    await delay(waitMs(response, attempt));
    return sendWithRetry(request, attempt + 1);
  });
}

function waitMs(response: Response, attempt: number): number {
  if (response.status !== 429) {
    return 1000 * (attempt + 1);
  }

  const retryAfter = Number(response.headers.get("retry-after"));
  if (Number.isFinite(retryAfter) && retryAfter >= 0) {
    return retryAfter * 1000;
  }

  return 5000;
}

function delay(ms: number): Promise<void> {
  return new Promise((resolve) => {
    setTimeout(resolve, ms);
  });
}
