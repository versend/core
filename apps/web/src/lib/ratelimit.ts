import { Ratelimit } from "@upstash/ratelimit";
import { Redis } from "@upstash/redis";

import HttpStatusCode from "@/enums/http-status-codes";
import { env } from "@/env";

const ratelimit =
  env.UPSTASH_REDIS_REST_URL && env.UPSTASH_REDIS_REST_TOKEN
    ? new Ratelimit({
        redis: new Redis({
          url: env.UPSTASH_REDIS_REST_URL,
          token: env.UPSTASH_REDIS_REST_TOKEN,
        }),
        limiter: Ratelimit.slidingWindow(10, "60 s"),
      })
    : null;

export function getClientIp(headers: Headers): string {
  const forwarded = headers.get("x-forwarded-for");
  return (
    forwarded?.split(",")[0]?.trim() || headers.get("x-real-ip") || "unknown"
  );
}

export async function checkRateLimit(
  ip: string
): Promise<Response | undefined> {
  if (!ratelimit) {
    return;
  }

  const { success, reset } = await ratelimit.limit(ip);
  if (success) {
    return;
  }

  return Response.json(
    { success: false, code: "rate_limit_exceeded", error: "Too many requests" },
    {
      status: HttpStatusCode.TOO_MANY_REQUESTS_429,
      headers: {
        "X-RateLimit-Reset": reset.toString(),
        "Retry-After": Math.ceil(
          Math.max(0, reset - Date.now()) / 1000
        ).toString(),
      },
    }
  );
}
