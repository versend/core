const maxAttempts = 3;

const waitMs = (response: Response, attempt: number): number => {
  if (response.status !== 429) {
    return 1000 * (attempt + 1);
  }

  const retryAfter = Number(response.headers.get("retry-after"));
  if (Number.isFinite(retryAfter) && retryAfter >= 0) {
    return retryAfter * 1000;
  }

  return 5000;
};

/**
 * Retries a destination request on 429 and 5xx.
 *
 * @param request - Destination request.
 * @param attempt - Zero-based attempt index.
 * @returns The result.
 */
export const sendWithRetry = async (
  request: () => Promise<Response>,
  attempt = 0
): Promise<Response> => {
  const response = await request();
  const retryable = response.status === 429 || response.status >= 500;
  if (response.ok || !retryable || attempt === maxAttempts - 1) {
    if (!response.ok) {
      throw new Error(`destination responded ${response.status}`);
    }
    return response;
  }

  await Bun.sleep(waitMs(response, attempt));
  return sendWithRetry(request, attempt + 1);
};
