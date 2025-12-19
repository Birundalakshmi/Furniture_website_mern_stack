
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        charcoal: {
          50: '#f6f6f6',
          100: '#e7e7e7',
          200: '#d1d1d1',
          300: '#b0b0b0',
          400: '#888888',
          500: '#6d6d6d',
          600: '#5d5d5d',
          700: '#4f4f4f',
          800: '#454545',
          900: '#3d3d3d',
          950: '#262626',
        },
        terracotta: {
          50: '#fdf4f3',
          100: '#fce7e4',
          200: '#f9d3ce',
          300: '#f4b5ab',
          400: '#ec8b7a',
          500: '#e16b50',
          600: '#cd5233',
          700: '#ab4228',
          800: '#8d3a24',
          900: '#753424',
          950: '#3f1910',
        },
      },
    },
  },
  plugins: [],
}