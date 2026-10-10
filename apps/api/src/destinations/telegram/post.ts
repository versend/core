import { sendWithRetry } from "../../delivery/retry";
import type { VercelWebhook } from "../../vercel-webhooks/payload";
import { telegramMessage } from "./message";

export async function postTelegram(
  webhook: VercelWebhook,
  token: string,
  chatId: string
): Promise<void> {
  const response = await sendWithRetry(() =>
    fetch(`https://api.telegram.org/bot${token}/sendMessage`, {
      body: JSON.stringify({
        chat_id: chatId,
        disable_web_page_preview: true,
        parse_mode: "HTML",
        text: telegramMessage(webhook),
      }),
      headers: { "content-type": "application/json" },
      method: "POST",
    })
  );

  const data = (await response.json()) as {
    ok?: boolean;
    description?: string;
  };
  if (data.ok === false) {
    throw new Error(data.description ?? "telegram rejected the message");
  }
}
