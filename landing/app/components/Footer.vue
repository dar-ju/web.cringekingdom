<script setup></script>

<template>
  <footer class="footer">
    <div class="container footer__container">
      <img
        src="/assets/images/word-decor-footer.webp"
        class="footer__image"
        alt=""
        loading="lazy"
        width="122"
        height="118"
      />
      <div class="footer__line-block footer__line-block--desktop">
        <div class="footer__line footer__line1">
          <NuxtLink to="/agreement" class="footer__text footer__text--left"
            >Пользовательское соглашение</NuxtLink
          >
          <span class="footer__text footer__text--right">Дизайн и разработка: dar-ju</span>
        </div>
        <div class="footer__line footer__line2">
          <NuxtLink to="/policy" class="footer__text footer__text--left"
            >Политика конфиденциальности</NuxtLink
          >
          <NuxtLink to="https://github.com/dar-ju" class="footer__text footer__text--right"
            >https://github.com/dar-ju</NuxtLink
          >
        </div>
      </div>
      <div class="footer__line-block footer__line-block--mobile">
        <div class="footer__line footer__line1">
          <NuxtLink to="/agreement" class="footer__text footer__text--left"
            >Пользовательское соглашение</NuxtLink
          >
          <NuxtLink to="/policy" class="footer__text footer__text--left"
            >Политика конфиденциальности</NuxtLink
          >
        </div>
        <div class="footer__line footer__line2">
          <span class="footer__text footer__text--right">Дизайн и разработка: dar-ju</span>
          <NuxtLink to="https://github.com/dar-ju" class="footer__text footer__text--right"
            >https://github.com/dar-ju</NuxtLink
          >
        </div>
      </div>
      <span class="footer__text">Cringe Kingdom &#169;</span>
      <span class="footer__text">{{ new Date().getFullYear() }}</span>
    </div>
  </footer>
</template>

<style lang="scss" scoped>
@use "@/assets/styles/breakpoints" as *;
.footer {
  padding-top: 2rem;
  padding-bottom: 2rem;
  &__container {
    position: relative;
    gap: clamp(0.6rem, 0.326rem + 1.37vw, 1.56rem);
  }
  &__image {
    position: absolute;
    width: clamp(4rem, 2.964rem + 5.179vw, 7.625rem);
    top: clamp(-2.5rem, -1.214rem - 1.429vw, -1.5rem);
    left: 50%;
    transform: translateX(-50%);
    opacity: 0.6;
  }
  &__line-block {
    display: flex;
    flex-direction: column;
    gap: clamp(0.6rem, 0.326rem + 1.37vw, 1.56rem);
    &--mobile {
      display: none;
    }
  }
  &__line {
    display: flex;
    justify-content: space-between;
  }
  &__line1 {
    gap: clamp(6rem, 4.57rem + 7.14vw, 11rem);
  }
  &__line2 {
    gap: clamp(2rem, 0.39rem + 8.04vw, 7.625rem);
    justify-content: center;
  }
  &__text {
    font-size: clamp(0.875rem, 0.589rem + 1.43vw, 1.875rem);
    &--left {
      width: clamp(14.375rem, 8.66rem + 29.57vw, 34.375rem);
      text-align: end;
      color: var(--white);
    }
    &--right {
      width: clamp(14.375rem, 8.66rem + 29.57vw, 34.375rem);
      color: var(--white);
    }
  }
}

// Media
@include media-query-l {
  .footer {
    &__image {
      top: clamp(-3.6875rem, -1.96rem - 1.69vw, -2.5rem);
    }
    &__line-block {
      &--desktop {
        display: none;
      }
      &--mobile {
        display: flex;
      }
    }
    &__line {
      flex-direction: column;
      justify-content: center;
      gap: clamp(0.6rem, 0.326rem + 1.37vw, 1.56rem);
    }
    &__text {
      width: initial;
      text-align: center;
    }
  }
}
</style>
