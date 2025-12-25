import discord from "./discord";
import type { Provider } from "./types";

// Add new providers here
const ALL_PROVIDERS = [discord] as const;

// Filter to only enabled providers (non-null)
export const providers: Provider[] = ALL_PROVIDERS.filter(
  (p): p is Provider => p !== null
);
