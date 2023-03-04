// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  modules: ['@nuxtjs/tailwindcss'],
  css: ['~/styles/global.css'],
  runtimeConfig: {
    apiKey: '',
  },
  typescript: {
    strict: true,
    shim: false,
  },
});
