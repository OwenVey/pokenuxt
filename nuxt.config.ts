export default defineNuxtConfig({
  app: {
    head: {
      title: 'Pokenuxt',
    },
  },
  modules: ['@nuxtjs/tailwindcss', '@nuxt/image-edge', '@vueuse/nuxt', '@nuxt/devtools'],
  css: ['~/styles/global.css'],
  runtimeConfig: {
    apiKey: '',
  },
  typescript: {
    strict: true,
    shim: false,
    typeCheck: true,
  },
  routeRules: {
    '/': {
      static: true,
      cache: { maxAge: 60 * 60 * 24 },
    },
    '/**': {
      static: true,
      cache: { maxAge: 60 * 60 * 24 },
    },
  },
});
