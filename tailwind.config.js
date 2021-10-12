module.exports = {
  purge: ['./pages/**/*.{js,ts,jsx,tsx}', './components/**/*.{js,ts,jsx,tsx}'],
  darkMode: false, // or 'media' or 'class'
  theme: {
    extend: {
      fontFamily: {
        'roboto-mono': ['"Roboto Mono"']
      }
    }
  },
  variants: {
    extend: {},
  },
  plugins: []
}
