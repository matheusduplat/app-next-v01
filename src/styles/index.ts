import {createStitches} from "@stitches/react";

export const {
  getCssText,
  config,
  styled,
  globalCss,
  css,
  keyframes,
  theme,
  createTheme,
} = createStitches({
  theme: {
    colors: {
      rocketseat: "#8257e6",
      white: "#fff",
      gray900: "#121214",
      gray800: "#202024",
      gray300: "#c4c4cc",
      gray100: "#e1e1e6",

      green500: "#30875f",
      green300: "#00b37e",
    },
    fontSizes: {
      md: "1.125rem",
      lg: "1.25rem",
      xl: "1.5re,",
      "2xl": "2rem",
    },
  },
});
