import type { Config } from "tailwindcss"

const config = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        'light-blue': '#EEF2FA',
        'dark-blue': '#001041',
        'yellow': '#FFC400',
      },
    },
  },
  plugins: [],
} satisfies Config

export default config
