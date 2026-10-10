import type { DeliveryTone } from "../present/tone";

const colorByTone: Record<DeliveryTone, number> = {
  failure: 0xe5_48_4d,
  neutral: 0x8b_8d_98,
  notice: 0x6e_56_cf,
  progress: 0xf5_a5_24,
  success: 0x30_a4_6c,
};

export const discordAuthor = {
  iconUrl:
    "https://assets.vercel.com/image/upload/front/favicon/vercel/180x180.png",
  name: "versend.io",
  url: "https://versend.io",
};

export function toneColor(tone: DeliveryTone): number {
  return colorByTone[tone];
}
