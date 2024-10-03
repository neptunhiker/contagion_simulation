// tailwind.config.js
module.exports = {
  content: [
    './simulation/templates/simulation/*.html',  // Paths to your HTML templates
    './**/*.js', // Include JS files if using Tailwind classes in JS
    '!./node_modules/**/*.js', // Exclude node_modules
  ],
  darkMode: 'class', // or 'media' or 'class'
  theme: {
      extend: {},
  },
  variants: {
      extend: {},
  },
  plugins: [],
}
