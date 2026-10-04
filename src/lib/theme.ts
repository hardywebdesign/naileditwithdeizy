import type { CSSProperties } from "react";
import { palettes, type Palette, type PaletteName } from "@/lib/palettes";

/**
 * Turns Deizy's four chosen colors into the full set of CSS variables the
 * site uses. The important part is readability: whatever colors she picks,
 * text on buttons and on the page is adjusted until it meets WCAG AA
 * contrast (4.5:1), so a pale main color can't produce unreadable text.
 */

type RGB = [number, number, number];

const HEX = /^#?([0-9a-f]{6})$/i;

export function isHex(value: unknown): value is string {
  return typeof value === "string" && HEX.test(value.trim());
}

function toRgb(hex: string): RGB {
  const h = hex.trim().replace("#", "");
  return [0, 2, 4].map((i) => parseInt(h.slice(i, i + 2), 16)) as RGB;
}

function toHex([r, g, b]: RGB): string {
  return (
    "#" +
    [r, g, b]
      .map((v) => Math.round(Math.min(255, Math.max(0, v))).toString(16).padStart(2, "0"))
      .join("")
  );
}

/** Blend a toward b by amount (0 = a, 1 = b). */
export function mix(a: string, b: string, amount: number): string {
  const ca = toRgb(a);
  const cb = toRgb(b);
  return toHex(ca.map((v, i) => v + (cb[i] - v) * amount) as RGB);
}

function luminance(hex: string): number {
  const [r, g, b] = toRgb(hex).map((v) => {
    const c = v / 255;
    return c <= 0.03928 ? c / 12.92 : ((c + 0.055) / 1.055) ** 2.4;
  });
  return 0.2126 * r + 0.7152 * g + 0.0722 * b;
}

export function contrast(a: string, b: string): number {
  const [hi, lo] = [luminance(a), luminance(b)].sort((x, y) => y - x);
  return (hi + 0.05) / (lo + 0.05);
}

export function isDark(hex: string): boolean {
  return luminance(hex) < 0.2;
}

/** Nudge `color` toward `toward` until it reaches `ratio` against every background. */
function ensureContrast(color: string, backgrounds: string[], toward: string, ratio = 4.5) {
  let result = color;
  for (let step = 1; step <= 20; step++) {
    if (backgrounds.every((bg) => contrast(result, bg) >= ratio)) return result;
    result = mix(color, toward, step * 0.05);
  }
  return result;
}

/** Whichever of the two candidates reads better on `bg`. */
function readableOn(bg: string, a: string, b: string): string {
  return contrast(a, bg) >= contrast(b, bg) ? a : b;
}

export type ThemeSetting =
  | { discriminant: PaletteName; value: null }
  | { discriminant: "custom"; value: Partial<Palette> };

export function resolvePalette(setting: ThemeSetting | null | undefined): Palette {
  const fallback = palettes.fall.colors;
  if (!setting) return fallback;
  if (setting.discriminant === "custom") {
    const v = setting.value ?? {};
    return {
      main: isHex(v.main) ? v.main : fallback.main,
      soft: isHex(v.soft) ? v.soft : fallback.soft,
      background: isHex(v.background) ? v.background : fallback.background,
      text: isHex(v.text) ? v.text : fallback.text,
    };
  }
  return palettes[setting.discriminant]?.colors ?? fallback;
}

/** CSS custom properties for <html style>. Tailwind colors read these. */
export function themeVariables(palette: Palette): CSSProperties {
  const bg = palette.background;
  const darkPage = isDark(bg);
  const text = ensureContrast(palette.text, [bg], darkPage ? "#ffffff" : "#000000", 7);
  const away = darkPage ? "#ffffff" : "#000000";

  // Main color must read as text on the page and on soft sections.
  const main = ensureContrast(palette.main, [bg, palette.soft], away);
  const mainDeep = mix(main, "#000000", darkPage ? 0.55 : 0.4);
  const soft = palette.soft;
  const softDeep = mix(soft, main, 0.22);
  const textSoft = ensureContrast(mix(text, bg, 0.32), [bg, soft], text);
  const surface = darkPage ? mix(bg, "#ffffff", 0.06) : "#ffffff";

  return {
    "--c-main": main,
    "--c-main-deep": mainDeep,
    "--c-main-bright": darkPage ? mix(main, "#ffffff", 0.15) : mix(main, "#ff0040", 0.2),
    "--c-on-main": readableOn(main, bg, text),
    "--c-on-deep": readableOn(mainDeep, bg, text),
    "--c-soft": soft,
    "--c-soft-deep": softDeep,
    "--c-bg": bg,
    "--c-surface": surface,
    "--c-text": text,
    "--c-text-soft": textSoft,
    colorScheme: darkPage ? "dark" : "light",
  } as CSSProperties;
}
