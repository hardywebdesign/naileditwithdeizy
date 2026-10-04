/**
 * Seasonal color palettes Deizy can pick from in the editor.
 * Each palette needs only four colors; every other shade on the site
 * (hover states, footer, muted text, readable text on buttons) is
 * worked out from these in src/lib/theme.ts.
 *
 * Kept free of server-only imports because keystatic.config.ts (which
 * runs in the browser) imports the labels.
 */

export type Palette = {
  /** Buttons, headings and accents */
  main: string;
  /** Soft section backgrounds */
  soft: string;
  /** Page background */
  background: string;
  /** Body text */
  text: string;
};

export const palettes = {
  fall: {
    label: "Fall: pumpkin spice and cream",
    colors: { main: "#9a4416", soft: "#f3dcc4", background: "#fdf7f0", text: "#2d1b10" },
  },
  spooky: {
    label: "Spooky season: dark with pumpkin orange",
    colors: { main: "#f07a2a", soft: "#2a2133", background: "#151018", text: "#f4ecf6" },
  },
  winter: {
    label: "Winter: icy blue and snow",
    colors: { main: "#1f4e79", soft: "#dde9f3", background: "#f8fbfd", text: "#13212e" },
  },
  valentine: {
    label: "Valentine's: rose and blush",
    colors: { main: "#b0123e", soft: "#fbdde6", background: "#fff8fa", text: "#2a0e17" },
  },
  spring: {
    label: "Spring: lilac and mint",
    colors: { main: "#6d4a9c", soft: "#e4f1df", background: "#fbfdf8", text: "#24222b" },
  },
  summer: {
    label: "Summer: coral and sunshine",
    colors: { main: "#c94f22", soft: "#fde7cf", background: "#fffaf3", text: "#2b1c14" },
  },
  classic: {
    label: "Classic: cherry lacquer",
    colors: { main: "#7a1233", soft: "#f7dde2", background: "#fff8f8", text: "#22101a" },
  },
} as const satisfies Record<string, { label: string; colors: Palette }>;

export type PaletteName = keyof typeof palettes;
export const paletteNames = Object.keys(palettes) as PaletteName[];
