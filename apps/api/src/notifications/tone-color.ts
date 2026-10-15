import type { NotificationTone } from "./tone";

const colorByTone: Record<NotificationTone, number> = {
  failure: 0xe5_48_4d,
  neutral: 0x8b_8d_98,
  notice: 0x6e_56_cf,
  progress: 0xf5_a5_24,
  success: 0x30_a4_6c,
};

/**
 * Accent color for a tone, as a 24-bit RGB number.
 *
 * @param tone - Notification tone.
 * @returns The result.
 */
export const toneColor = (tone: NotificationTone): number => colorByTone[tone];

/**
 * Accent color for a tone, as a CSS hex string.
 *
 * @param tone - Notification tone.
 * @returns The result.
 */
export const toneColorHex = (tone: NotificationTone): string =>
  `#${toneColor(tone).toString(16).padStart(6, "0")}`;
