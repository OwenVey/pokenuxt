// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  app: {
    head: {
      title: 'Pokenuxt',
    },
  },
  modules: ['@nuxtjs/tailwindcss', '@nuxt/image-edge', '@vueuse/nuxt'],
  css: ['~/styles/global.css'],
  runtimeConfig: {
    apiKey: '',
  },
  typescript: {
    strict: true,
    shim: false,
    typeCheck: true,
  },
});
