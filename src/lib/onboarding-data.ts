/**
 * Static onboarding configuration.
 *
 * Telegram URLs, YouTube tutorial ID and the platform URL come from public
 * env vars (NEXT_PUBLIC_*) so they can be rotated without a code change.
 * Hardcoded fallbacks keep the flow working when env is missing.
 */

const env = {
  ejercicios:
    process.env.NEXT_PUBLIC_TELEGRAM_EJERCICIOS_URL ??
    "https://t.me/+hMnHLq8KychkNTZk",
  general:
    process.env.NEXT_PUBLIC_TELEGRAM_GENERAL_URL ??
    "https://t.me/+KExecqiF5Is2NjU8",
  tablon:
    process.env.NEXT_PUBLIC_TELEGRAM_TABLON_URL ??
    "https://t.me/+d0ihdefLpak0ZmM0",
  platform:
    process.env.NEXT_PUBLIC_PLATFORM_URL ?? "https://academiadecombate.com",
  tutorialYoutubeId:
    process.env.NEXT_PUBLIC_TUTORIAL_YOUTUBE_ID ?? "0KI767I2JTE",
} as const;

export const PLATFORM_URL = env.platform;
export const TUTORIAL_YOUTUBE_ID = env.tutorialYoutubeId;

export type GroupId = "ejercicios" | "general" | "tablon";

export type Group = {
  readonly id: GroupId;
  readonly emoji: string;
  readonly name: string;
  readonly tag: string;
  readonly desc: string;
  readonly url: string;
  readonly members: string;
};

export const GROUPS: readonly Group[] = [
  {
    id: "ejercicios",
    emoji: "🧠",
    name: "Grupo de Ejercicios",
    tag: "PSICOTÉCNICOS + CLASES EN DIRECTO",
    desc: "Aquí resuelves dudas de psicotécnicos y accedes a los enlaces de las clases en directo. Es tu sala de operaciones diaria.",
    url: env.ejercicios,
    members: "Activo todos los días",
  },
  {
    id: "general",
    emoji: "🎖️",
    name: "Grupo General",
    tag: "ORIENTACIÓN MILITAR",
    desc: "Dudas sobre la vida militar, especialidades y procesos de selección. Tienes 10 militares en activo de los 3 Ejércitos respondiendo.",
    url: env.general,
    members: "10 militares en activo",
  },
  {
    id: "tablon",
    emoji: "📋",
    name: "Tablón de Anuncios",
    tag: "AVISOS OFICIALES",
    desc: "Solo el equipo publica aquí. Cambios de horario, convocatorias, novedades importantes. Activa las notificaciones.",
    url: env.tablon,
    members: "Canal oficial",
  },
] as const;

export const STEPS = [
  "welcome",
  "groups",
  "telegram",
  "tutorial",
  "done",
] as const;

export type StepId = (typeof STEPS)[number];
export const TOTAL_STEPS = STEPS.length;
