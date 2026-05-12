export default defineNuxtConfig({
  devtools: { enabled: true },

  app: {
    head: {
      htmlAttrs: { 'data-bs-theme': 'dark' },
    },
  },

  runtimeConfig: {
    public: {
      apiBase: 'http://localhost:3000',
    },
  },
  css: ['~/assets/css/main.css'],

  routeRules: {
    '/blog': { prerender: true },
    '/blog/**': { prerender: true },
    '/videogames': { ssr: true },
    '/videogames/**': { ssr: true },
    '/info': { ssr: false },
    '/info/**': { ssr: false },
  },

  nitro: {
    prerender: {
      routes: [
        '/blog',
        '/blog/rise-of-open-world-games',
        '/blog/indie-studios-big-impact',
        '/blog/psychology-of-multiplayer',
      ],
    },
  },
})
