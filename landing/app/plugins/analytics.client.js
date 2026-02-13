export default defineNuxtPlugin(() => {
  // в dev разработе не будет работать аналитика
  if (import.meta.dev) return

  const config = useRuntimeConfig().public
  const router = useRouter()

  // Проверка: если ID не заданы, ничего не делаем
  if (!config.metrikaId && !config.googleId) return

  // --- Инициализация Яндекс Метрики ---
  if (config.metrikaId) {
    (function (m, e, t, r, i, k, a) {
      m[i] = m[i] || function () { (m[i].a = m[i].a || []).push(arguments) };
      m[i].l = 1 * new Date();
      for (var j = 0; j < document.scripts.length; j++) { if (document.scripts[j].src === r) { return; } }
      k = e.createElement(t), a = e.getElementsByTagName(t)[0], k.async = 1, k.src = r, a.parentNode.insertBefore(k, a)
    })
      (window, document, "script", "https://mc.yandex.ru/metrika/tag.js", "ym");

    window.ym(config.metrikaId, "init", {
      clickmap: true,
      trackLinks: true,
      accurateTrackBounce: true,
      webvisor: true,
      defer: true
    })
  }

  // --- Инициализация Google Analytics ---
  if (config.googleId) {
    const script = document.createElement('script')
    script.src = `https://www.googletagmanager.com/gtag/js?id=${config.googleId}`
    script.async = true
    document.head.appendChild(script)

    window.dataLayer = window.dataLayer || []
    window.gtag = function () { window.dataLayer.push(arguments) }
    window.gtag('js', new Date())
    window.gtag('config', config.googleId)
  }

  // --- Отслеживание переходов (для SPA режима) ---
  router.afterEach((to) => {
    // Ждем, пока сменится заголовок страницы
    nextTick(() => {
      if (config.metrikaId && typeof window.ym === 'function') {
        window.ym(config.metrikaId, 'hit', to.fullPath)
      }
      if (config.googleId && typeof window.gtag === 'function') {
        window.gtag('config', config.googleId, { page_path: to.fullPath })
      }
    })
  })
})
