<script setup></script>

<template>
  <header class="header">
    <div class="container">
      <nav>
        <ul class="header__list">
          <li class="header__item"><NuxtLink to="/#demo">Демо</NuxtLink></li>
          <li class="header__item"><NuxtLink to="/#download">Скачать</NuxtLink></li>
          <li class="header__item"><NuxtLink to="/#message">Написать</NuxtLink></li>
        </ul>
      </nav>
    </div>
  </header>
</template>

<style lang="scss" scoped>
.header {
  position: absolute;
  left: 50%;
  transform: translateX(-50%);
  padding-top: clamp(2rem, 1.5rem + 1.5vw, 3.3rem);
  &__list {
    display: flex;
    gap: clamp(1rem, 0.575rem + 2.125vw, 3.125rem);
  }
  &__item {
    font-family: "Arkhip", sans-serif;
    color: var(--color-primary-4);
    font-size: clamp(1rem, 0.9rem + 0.5vw, 1.5rem);
  }
}
</style>
