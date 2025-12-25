export type TelegramMessage = {
  chat_id: string;
  text: string;
  parse_mode: "HTML" | "MarkdownV2";
  disable_web_page_preview?: boolean;
};

export type TelegramResponse = {
  ok: boolean;
  result?: unknown;
  description?: string;
  error_code?: number;
};
