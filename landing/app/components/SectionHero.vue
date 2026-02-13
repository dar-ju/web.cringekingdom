<script setup>
import TitleMain from "~/components/svg/TitleMain.vue";
</script>

<template>
  <section class="hero">
    <div class="container">
      <div class="hero__title-block">
        <TitleMain class="hero__title-svg" />
      </div>
      <p class="hero__slogan">Чудовища не рождаются&nbsp;&mdash; их&nbsp;создают</p>
      <div class="hero__btn-wrapper">
        <NuxtLink to="#demo" class="btn btn-secondary">Испытать себя</NuxtLink>
        <NuxtLink to="#download" class="btn btn-primary">Начать игру</NuxtLink>
      </div>
    </div>
  </section>
</template>

<style lang="scss" scoped>
@use "@/assets/styles/breakpoints" as *;
.hero {
  padding-top: 3rem;
  padding-bottom: 3rem;
  &__title-block {
    position: relative;
    margin-bottom: clamp(2.5rem, 2.125rem + 1.875vw, 4.375rem);
    &::before {
      content: "";
      position: absolute;
      width: clamp(12.5rem, 10.25rem + 11.25vw, 23.75rem);
      height: clamp(2.5rem, 2.013rem + 2.44vw, 4.938rem);
      top: clamp(-4rem, -1.26rem + 0.06vw, -2rem);
      left: 50%;
      transform: translateX(-50%);
      background: url(/assets/images/word-decor-1.webp) center top / cover no-repeat;
      opacity: 0.6;
    }
  }
  &__title-svg {
    width: clamp(18.75rem, 11rem + 38.75vw, 57.5rem);
    height: clamp(3.438rem, 2.013rem + 7.13vw, 10.563rem);
    aspect-ratio: 752 / 138;
    filter: drop-shadow(0px 0px 6px #af6f25);
  }

  &__slogan {
    margin-bottom: clamp(3rem, 2.4rem + 3vw, 6rem);
    text-align: center;
    color: var(--color-primary-4);
    font-size: clamp(1rem, 0.9rem + 0.5vw, 1.5rem);
  }

  &__btn-wrapper {
    display: flex;
    justify-content: center;
    flex-wrap: wrap;
    gap: 1.3rem;
    margin: 0 auto;
  }
}

// Media
@include media-query-sm {
  .hero {
    &__btn-wrapper {
      flex-direction: column;
    }
  }
}
</style>
