/** @type {import('tailwindcss').Config} */
module.exports = {
  important: true,
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  presets: [require("nativewind/preset")],
  theme: {
    extend: {},
    colors: {
      primary: {
        DEFAULT: "#00D09E",
        foreground: "#093030",
      },
      secondary: {
        DEFAULT: "#DFF7E2",
        foreground: "#093030",
      },
      gray: {
        DEFAULT: "#DFF7E2",
        foreground: "#333333",
        700: "#9E9E9E",
      },
      white: {
        DEFAULT: "#FFFFFF",
        foreground: "#333333",
      },
      green: {
        DEFAULT: "#008900",
        foreground: "#FFFFFF",
      },
      blue: {
        DEFAULT: "#0068FF",
        foreground: "#FFFFFF",
      },
      red: {
        DEFAULT: "#FF0000",
        foreground: "#FFFFFF",
      },
      black: {
        DEFAULT: "#000000",
        foreground: "#FFFFFF",
      },
    },
  },
  plugins: [],
};
