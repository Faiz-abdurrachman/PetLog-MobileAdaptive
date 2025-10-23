const { fontFamily } = require("tailwindcss/defaultTheme");

/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",
    "./layouts/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      screens: {
        xs: "475px",
      },
      colors: {
        pl: {
          background: "var(--color-background-main)",
          card: "var(--color-background-card)",
          surface: "var(--color-surface)",
          border: "var(--color-border)",
          borderStrong: "var(--color-border-strong)",
          heading: "var(--color-text-heading)",
          body: "var(--color-text-body)",
          muted: "var(--color-text-muted)",
          primary: "var(--color-primary)",
          primaryHover: "var(--color-primary-hover)",
          primaryActive: "var(--color-primary-active)",
          primaryContrast: "var(--color-primary-contrast)",
          highlight: "var(--color-highlight)",
          accentSoft: "var(--color-accent-soft)",
          focus: "var(--color-focus)",
          shadow: "var(--color-shadow)",
        },
      },
      boxShadow: {
        pixel: "4px 4px 0 0 var(--color-shadow)",
        "pixel-sm": "2px 2px 0 0 var(--color-shadow)",
      },
      borderRadius: {
        pixel: "4px",
      },
      transitionDuration: {
        120: "120ms",
      },
      fontFamily: {
        display: ['"Press Start 2P"', '"VT323"', ...fontFamily.mono],
        body: ['"VT323"', ...fontFamily.sans],
      },
      fontSize: {
        xs: ["0.75rem", { lineHeight: "1rem" }],
        sm: ["0.875rem", { lineHeight: "1.25rem" }],
        base: ["1rem", { lineHeight: "1.5rem" }],
        lg: ["1.125rem", { lineHeight: "1.75rem" }],
        xl: ["1.25rem", { lineHeight: "1.75rem" }],
        "2xl": ["1.5rem", { lineHeight: "2rem" }],
        "3xl": ["1.875rem", { lineHeight: "2.25rem" }],
        "4xl": ["2.25rem", { lineHeight: "2.5rem" }],
        "5xl": ["3rem", { lineHeight: "1" }],
      },
    },
  },
  plugins: [],
};
