<script setup>
import AnimateFire from "~/components/common/AnimateFire.vue";
import SectionDemo from "~/components/SectionDemo.vue";
import SectionDownload from "~/components/SectionDownload.vue";
import SectionHero from "~/components/SectionHero.vue";
import SectionMessage from "~/components/SectionMessage.vue";

useSeoMeta({
  title: "Игра в слова Королевство Кривословия 🏰",
  ogTitle: "Королевство 👑 Кривословия — игра искажающая реальность",
  description:
    "Словесная игра &quot;Королевство Кривословия&quot; погружает в мир странных и пугающих вещей. Пройдите всех стражей и саму Кринжабу &#128056;!",
  ogDescription:
    "Разгадай этот мир странных существ и пугающих вещей, доберись до самой владыки королевства могущественной Кринжабы.",
  ogImage: "/assets/images/og-cringe-kingdom.jpg",
  ogType: "website",
  ogUrl: "https://cringekingdom.darju.ru",
  twitterCard: "summary_large_image",
});
</script>

<template>
  <main class="main">
    <div class="bckg-wrapper">
      <SectionHero />
      <SectionDemo />
      <AnimateFire />
    </div>
    <SectionDownload />
    <SectionMessage />
  </main>
</template>

<style lang="scss" scoped>
@use "@/assets/styles/breakpoints" as *;
.bckg-wrapper {
  padding-top: clamp(4rem, 3.4rem + 3vw, 7rem);
  background:
    linear-gradient(to left, rgba(0, 0, 0, 0) 30%, rgb(21, 11, 5) 100%),
    linear-gradient(to right, rgba(0, 0, 0, 0) 80%, rgb(21, 11, 5) 100%),
    linear-gradient(to bottom, rgba(0, 0, 0, 0) 60%, rgb(21, 11, 5) 100%),
    url("/assets/images/cringekingdom-background.webp") center top/cover no-repeat,
    var(--black);
}

// Media
@include media-query-sm {
  .bckg-wrapper {
    background:
      linear-gradient(to left, rgba(0, 0, 0, 0) 30%, rgb(21, 11, 5) 100%),
      linear-gradient(to right, rgba(0, 0, 0, 0) 80%, rgb(21, 11, 5) 100%),
      linear-gradient(to bottom, rgba(0, 0, 0, 0) 60%, rgb(21, 11, 5) 100%),
      url("/assets/images/cringekingdom-background-576.webp") center top/cover no-repeat;
  }
}
</style>
