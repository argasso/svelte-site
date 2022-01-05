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
        argasso2: {
          DEFAULT: '#660028',
          50: '#C2004C',
          100: '#B80048',
          200: '#A30040',
          300: '#8F0038',
          400: '#7A0030',
          500: '#660028',
          600: '#520020',
          700: '#3D0018',
          800: '#290010',
          900: '#140008',
        },
        argasso: {
          DEFAULT: '#D60054',
          50: '#FCF3F7',
          100: '#FAE0EA',
          200: '#F09DBE',
          300: '#ED649A',
          400: '#E92B75',
          500: '#D60054',
          600: '#9E003E',
          700: '#660028',
          800: '#2E0012',
          900: '#000000',
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
