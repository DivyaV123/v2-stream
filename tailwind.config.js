module.exports = {
  mode: 'jit',
  purge: [
    './components/**/*.{vue,js}',
    './layouts/**/*.vue',
    './pages/**/*.vue',
    './plugins/**/*.{js,ts}',
    './nuxt.config.{js,ts}',
  ],
  darkMode: false, // or 'media' or 'class'
  theme: {
    extend: {
      height: {
        'almost': 'calc(100vh - 8rem)',
        'video': 'calc(100vh - 10rem)',
        'sidebar': 'calc(100vh - 16rem)',
      },
      fontFamily: {
        sans: ["Lora", 'Arial', 'sans-serif'],
      },
      colors: {
        blue: {
          650: '#34568B',
          750: '#347B98',
          850: '#5B5EA6',
          950: '#203647',
          1000: '#12232E'
        },
        green: {
          650: '#009B77',
          750: '#45B8AC'
        },
        yellow: {
          650: '#FDAC53',
          750: '#DC793E'
        },
        red: {
          650: '#ea4335'
        },
        teal : {
          750 : '#0f766',
          650 : '#0d9488',
          550 : "#14b8a6",
          450 : "#2dd4bf",
          250 : "#99f6e4"
        }
      }
    },
  },
  variants: {
    extend: {
      opacity: ['disabled'],
    },
  },
  plugins: [require('daisyui'),],
  daisyui: {
    styled: true,
    base: true,
    themes: true,
    utils: true,
    themes: [
      'dark',
    ],
  },
}
