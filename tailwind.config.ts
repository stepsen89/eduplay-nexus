import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      backgroundImage: {
        "gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
        "gradient-conic": "conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))",
      },
      spacing: {
        "564": "564px",
        "500": "500px",
      },
    },
    // colors: {
    //   primary: "#242145",
    //   white: "#fff",
    // },
  },
  plugins: [],
  variants: {
    extend: {
      animation: ["animate-spin"],
    },
  },
  safelist: ["animation-spin"],
};
export default config;
