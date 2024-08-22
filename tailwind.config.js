/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{ejs,html}"],
  theme: {
    extend: {},
  },
  plugins: [
    require('daisyui'),
    require('@tailwindcss/line-clamp')
  ],
}

