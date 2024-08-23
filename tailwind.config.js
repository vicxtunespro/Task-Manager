/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{ejs,html}"],
  theme: {
    screen: {
      'smd': '768px',
      
    },
  },
  plugins: [
    require('daisyui'),
    require('@tailwindcss/line-clamp')
  ],
}

