export default {
  // Global page headers: https://go.nuxtjs.dev/config-head
  target: 'static',
  ssr: false,
  server: {
    port: 8004 // default: 3000
  },
  head: {
    title: 'online',
    htmlAttrs: {
      lang: 'en'
    },
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      { hid: 'description', name: 'description', content: '' },
      { name: 'format-detection', content: 'telephone=no' }
    ],
    link: [
      { rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' }
    ],
    script: [
      {
        src: "https://checkout.razorpay.com/v1/checkout.js"
      },
    ],
  },

  // Global CSS: https://go.nuxtjs.dev/config-css
  css: [
    '@fortawesome/fontawesome-svg-core/styles.css'
  ],

  // Plugins to run before rendering page: https://go.nuxtjs.dev/config-plugins
  plugins: [
    "@/plugins/axios-cookie",
    "@/plugins/vee-validate",
    '@/plugins/vue-select',
    // '@/plugins/tel-input',
    '@/plugins/vue-dialog',
    { src: '~/plugins/vue-datepicker', ssr: false },
    '@/plugins/vue-clipboard',
    '@/plugins/fontawesome',
    '@/plugins/vue-pagination',

  ],

  // Auto import components: https://go.nuxtjs.dev/config-components
  components: true,

  // Modules for dev and build (recommended): https://go.nuxtjs.dev/config-modules
  buildModules: [
    // https://go.nuxtjs.dev/tailwindcss
    '@nuxtjs/tailwindcss',
  ],
  // Modules: https://go.nuxtjs.dev/config-modules
  modules: [

    // https://go.nuxtjs.dev/axios
    '@nuxtjs/axios',
    ['@nuxtjs/component-cache', { maxAge: 1000 * 60 * 60 }],
    // 'nuxt-purgecss',
    'nuxt-socket-io'
  ],
  io: {
    sockets: [ // Required
      { name: 'ss3', url: 'https://ss3.qspiders.com', default: true },
      { name: 'ss1', url: 'https://ss1.qspiders.com' },
      { name: 'ss3', url: 'https://ss3.qspiders.com' },
      { name: 'ss4', url: 'https://ss4.qspiders.com' },
      { name: 'ss5', url: 'https://ss5.qspiders.com' },
      { name: 'ss6', url: 'https://ss6.qspiders.com' },
      { name: 'ss7', url: 'https://ss7.qspiders.com' },
      { name: 'ss8', url: 'https://ss8.qspiders.com' },
      { name: 'ss9', url: 'https://ss9.qspiders.com' },
      { name: 'ss10', url: 'https://ss10.qspiders.com' },
      { name: 'ss11', url: 'https://ss11.qspiders.com' },
      { name: 'ss12', url: 'https://ss12.qspiders.com' },
      { name: 'ss13', url: 'https://ss13.qspiders.com' },
      { name: 'ss14', url: 'https://ss14.qspiders.com' },
      { name: 'ss15', url: 'https://ss15.qspiders.com' },
      { name: 'ss16', url: 'https://ss16.qspiders.com' },
      { name: 'ss17', url: 'https://ss17.qspiders.com' },
      { name: 'ss18', url: 'https://ss18.qspiders.com' },
      { name: 'ss19', url: 'https://ss19.qspiders.com' },
      { name: 'ss20', url: 'https://ss20.qspiders.com' },
      { name: 'ss21', url: 'https://ss21.qspiders.com' },
      { name: 'ss23', url: 'https://ss23.qspiders.com' },
      { name: 'ss24', url: 'https://ss24.qspiders.com' },
      { name: 'ss25', url: 'https://ss25.qspiders.com' },
      { name: 'ss26', url: 'https://ss26.qspiders.com' },
      { name: 'ss27', url: 'https://ss27.qspiders.com' },
      { name: 'ss28', url: 'https://ss28.qspiders.com' },
      { name: 'ss29', url: 'https://ss29.qspiders.com' },
      { name: 'ss30', url: 'https://ss30.qspiders.com' },
      { name: 'ss31', url: 'https://ss31.qspiders.com' },
      { name: 'ss32', url: 'https://ss32.qspiders.com' },
      { name: 'ss33', url: 'https://ss33.qspiders.com' },
      { name: 'ss34', url: 'https://ss34.qspiders.com' },
      { name: 'ss35', url: 'https://ss35.qspiders.com' },
      { name: 'ss36', url: 'https://ss36.qspiders.com' },
      { name: 'ss37', url: 'https://ss37.qspiders.com' },
      { name: 'ss38', url: 'https://ss38.qspiders.com' },
      { name: 'ss39', url: 'https://ss39.qspiders.com' },
      { name: 'ss40', url: 'https://ss40.qspiders.com' },
      { name: 'ss43', url: 'https://ss43.qspiders.com' },
      { name: 'india1', url: 'https://india1.qspiders.com' },
    ]
  },
  purgeCSS: {
    whitelistPatterns: [/-fa$/, /^fa-/],
  },
  fontawesome: {
    icons: { solid: true, brands: true }
  },

  // Axios module configuration: https://go.nuxtjs.dev/config-axios
  axios: {},
  router: {
    linkExactActiveClass: 'is-active-link'
  },
  // Build Configuration: https://go.nuxtjs.dev/config-build
  build: {
    transpile: ['vee-validate/dist/rules'],
    postcss: {
      order: 'cssnanoLast'
    }
  }
}
