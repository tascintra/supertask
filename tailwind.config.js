/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        primary: {
          200: '#F9B384',
          500: '#FC8879',
          700: '#EE6F57',
          900: '#F65050',
        },
        dark: {
          300: '#2C2D36',
          400: '#27282F',
          500: '#1E1F23',
          600: '#17181C',
          700: '#111517',
        },
      },
    },
  },
  plugins: [],
}
