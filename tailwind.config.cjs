const colors = require('tailwindcss/colors')
const config = {
  mode: 'jit',
  purge: ['./src/**/*.{html,js,svelte,ts}'],
  darkMode: 'class',
  theme: {
    container: {
      center: true,
      padding: {
        DEFAULT: '1rem',
        sm: '2rem',
        lg: '4rem',
        xl: '5rem',
        '2xl': '6rem',
      },
    },
    extend: {
      colors: {
        teal: {
          50: '#E0F2F1',
          100: '#B2DFDB',
          200: '#80CBC4',
          300: '#4DB6AC',
          400: '#26A69A',
          500: '#009688',
          600: '#00897B',
          700: '#00796B',
          800: '#00695C',
          900: '#004D40',
        },
      },
      gridTemplateColumns: {
        ' -2': 'repeat(2, 200px)',
        'books-3': 'repeat(3, 200px)',
        'books-4': 'repeat(4, 200px)',
        'books-5': 'repeat(5, 200px)',
        'books-6': 'repeat(6, 200px)',
      },
      outline: {
        'gray-100': [`4px solid ${colors.gray[100]}`, '4px'],
        'green-50': [`4px solid ${colors.green[50]}`, '4px'],
        white: [`0px solid ${colors.white}`, '0px'],
      },
    },
  },
  plugins: [
    require('@tailwindcss/line-clamp'),
    // require('tailwindcss-debug-screens'),
    require('@tailwindcss/forms'),
  ],
}

module.exports = config
