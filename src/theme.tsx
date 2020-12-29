import { theme } from "@chakra-ui/core";

const fonts = { ...theme.fonts, mono: `'Menlo', monospace` };

// const breakpoints = ["40em", "52em", "64em"];

const breakpoints = ["360px", "768px", "1024px", "1440px"];
breakpoints.sm = breakpoints[0];
breakpoints.md = breakpoints[1];
breakpoints.lg = breakpoints[2];
breakpoints.xl = breakpoints[3];


const themeConfig = {
  ...theme,
  colors: {
    ...theme.colors,
    black: "#16161D",
    spaceGray: "#393945",
    spaceGrayDark: "#32323E",
  },
  fonts,
  breakpoints,
};

export default themeConfig;
