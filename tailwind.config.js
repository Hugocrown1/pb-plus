/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    // colors: {
    //   primary: "var(--color-primary)",
    //   secondary: "var(--color-secondary)",
    //   accent: "var(--color-accent)",
    //   "text-primary": "var(--color-text-primary)",
    //   "text-secondary": "var(--color-text-secondary)",
    //   white: "var(--color-white)",
    //   gray: "var(--color-gray)",
    //   "gray-transparent": "var(--color-gray-transparent)",
    //   "white-transparent": "var(--color-white-transparent)",
    // },
    extend: {
      backgroundImage: {
        "gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
        "gradient-conic":
          "conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))",
      },
    },
  },
  plugins: [],
};
