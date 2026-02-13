// https://nuxt.com/docs/api/configuration/nuxt-config

export default defineNuxtConfig({
  ssr: true,
  build: {
    transpile: ["vue", "pinia"],
  },
  app: {
    pageTransition: { name: "fade", mode: "out-in" },
    head: {
      htmlAttrs: {
        lang: "ru",
      },
      link: [
        { rel: "icon", type: "image/x-icon", href: "/assets/images/favicon/favicon.ico" },
        {
          rel: "icon",
          type: "image/png",
          sizes: "96x96",
          href: "/assets/images/favicon/favicon-96x96.png",
        },
        {
          rel: "apple-touch-icon",
          sizes: "180x180",
          href: "/assets/images/favicon/apple-touch-icon.png",
        },
        { rel: "manifest", href: "/assets/images/favicon/site.webmanifest" },
      ],
      meta: [
        { name: "robots", content: "index, follow" },
        { name: "theme-color", content: "#150b05" },
      ],
    },
  },
  compatibilityDate: "2024-04-03",
  devtools: {
    enabled: true,
  },
  components: true,
  css: ["~/assets/styles/styles.scss"],
  modules: ["@pinia/nuxt", "@nuxtjs/sitemap"],
  runtimeConfig: {
    public: {
      metrikaId: 106817293,
      googleId: "G-4WN2ZSVH62",
    },
  },
  nitro: {
    routeRules: {
      "/**/*.{png,jpg,jpeg,webp,svg,ico}": {
        headers: {
          "cache-control": "public, max-age=604800",
        },
      },
    },
  },
  site: { url: "https://cringekingdom.darju.ru" },
});
