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
          200: '#EE985D',
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

      boxShadow: {
        component: '0px 0px 4px 0px rgba(0, 0, 0, 0.10)',
        focused: '0px 0px 8px 0px rgba(0, 0, 0, 0.20)',
        'focused-dark': '0px 0px 2px 2px rgba(123, 123, 123, 0.10)',
      },
    },
  },
  plugins: [],
}
