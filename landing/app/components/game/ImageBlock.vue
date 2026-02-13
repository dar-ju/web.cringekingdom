<script setup>
import { useGameStore } from "~/stores/gameStore";

const gameStore = useGameStore();

const image = () => {
  if (gameStore.currentWordIndex + 1 > gameStore.words.length) {
    return `/assets/images/noimage.webp`;
  } else {
    return `/assets/images/${gameStore.words[gameStore.currentWordIndex].image}`;
  }
};
</script>

<template>
  <div class="img">
    <Transition name="zoom" mode="out-in">
      <img
        :src="image()"
        :key="gameStore.currentWordIndex"
        class="image"
        alt="Разгадай картинку в бесплатной словесной игре Королевство Кривословия"
        decoding="async"
        loading="eager"
        width="376"
        height="376"
      />
    </Transition>
  </div>
</template>

<style lang="scss" scoped>
img {
  aspect-ratio: 1 / 1;
  border: 2px solid var(--color-primary-6);
  border-radius: 0.525rem;
}

// Animation
.zoom-enter-active,
.zoom-leave-active {
  transition: all 0.5s ease;
}
.zoom-enter-from {
  opacity: 0;
  transform: scale(0.5);
}
.zoom-leave-to {
  opacity: 0;
}
</style>
