<script setup>
import ImageBlock from "./game/ImageBlock.vue";
import KeyBoard from "./game/KeyBoard.vue";
import WordLine from "./game/WordLine.vue";
import { useGameStore } from "~/stores/gameStore";

const gameStore = useGameStore();

const nextWord = () => {
  gameStore.currentWordIndex++;
  if (gameStore.currentWordIndex + 1 <= gameStore.words.length) {
    gameStore.isGuessed = false;
  }
};

const startAgain = () => {
  gameStore.currentWordIndex = 0;
  gameStore.isGuessed = false;
};
</script>

<template>
  <section id="demo" class="demo">
    <div class="container">
      <div class="demo__text-block">
        <p class="demo__text">Мир заполонили странные создания и&nbsp;искажённые вещи.</p>
        <p class="demo__text">Знать их&nbsp;имя&nbsp;&mdash; путь к&nbsp;победе.</p>
      </div>
      <div class="demo__game-block">
        <Transition name="fade" mode="in-out">
          <div
            v-if="gameStore.isGuessed && gameStore.currentWordIndex + 1 <= gameStore.words.length"
            class="demo__win-group"
          >
            <span>{{ `${gameStore.currentWordIndex + 1} из ${gameStore.words.length}` }}</span>
            <div class="demo__win-wrapper">
              <h2 class="demo__win-title">Верно!</h2>
              <div class="demo__win-word-wrapper">
                <p class="demo__win-word">{{ gameStore.words[gameStore.currentWordIndex].word }}</p>
                <p class="demo__win-answer">
                  {{ gameStore.words[gameStore.currentWordIndex].answer }}
                </p>
              </div>
              <button @click="nextWord()" class="btn btn-secondary" type="button">
                Продолжить
              </button>
            </div>
          </div>
        </Transition>

        <Transition name="fade" mode="in-out">
          <div
            v-if="gameStore.currentWordIndex + 1 > gameStore.words.length"
            class="demo__win-group"
          >
            <div class="demo__win-wrapper">
              <h2 class="demo__win-title">Отлично!</h2>
              <p class="demo__win-text">
                У тебя есть все шансы справиться с источником кривословия - Кринжабой.
              </p>
              <div class="demo__win-btn-group">
                <NuxtLink to="/#download" class="btn btn-primary">Скачать игру</NuxtLink>
                <button @click="startAgain()" class="btn btn-secondary" type="button">
                  Пройти демо заново
                </button>
              </div>
            </div>
          </div>
        </Transition>

        <div
          class="demo__game-wrapper"
          :class="{ 'demo__game-wrapper--black': gameStore.isGuessed }"
        >
          <ImageBlock />
          <WordLine />
          <KeyBoard />
        </div>
        <img
          src="/assets/images/word-decor-corner.webp"
          class="demo__decor demo__decor--left"
          alt=""
          loading="lazy"
          width="199"
          height="128"
        />
        <img
          src="/assets/images/word-decor-corner.webp"
          class="demo__decor demo__decor--right"
          alt=""
          loading="lazy"
          width="199"
          height="128"
        />
      </div>
    </div>
  </section>
</template>

<style lang="scss" scoped>
@use "@/assets/styles/breakpoints" as *;
.demo {
  max-width: 525px;
  margin: 0 auto;
  padding: clamp(1rem, 0.6rem + 2vw, 3rem) clamp(0rem, 1.2rem - 0.625vw, 1rem)
    clamp(3rem, 4.2rem - 0.625vw, 4rem) clamp(0rem, 1.2rem - 0.625vw, 1rem);
  &__text-block {
    display: flex;
    flex-direction: column;
    gap: 1rem;
    margin-bottom: clamp(1.5rem, 0.9rem + 1.875vw, 4.5rem);
  }
  &__text {
    text-align: center;
    font-size: clamp(0.8rem, 0.71rem + 0.45vw, 1.25rem);
    color: var(--color-primary-4);
  }

  &__game-block {
    position: relative;
    z-index: 1;
  }
  &__win-group {
    position: absolute;
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 2rem;
    left: 50%;
    top: 50%;
    transform: translate(-50%, -50%);
    z-index: 1;
  }
  &__win-wrapper {
    display: flex;
    flex-direction: column;
    gap: 3rem;
  }
  &__win-title {
    font-size: 3rem;
  }
  &__win-word-wrapper {
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 0.4rem;
  }
  &__win-word {
    font-size: 2rem;
    font-weight: 700;
    color: var(--white);
    text-transform: uppercase;
  }
  &__win-answer {
    font-size: 0.8rem;
    color: var(--color-primary-4);
    text-transform: uppercase;
  }
  &__win-text {
    font-size: 1rem;
    color: var(--white);
    text-align: center;
  }
  &__win-btn-group {
    display: flex;
    flex-direction: column;
    gap: 1.5rem;
    align-self: center;
    width: clamp(11.875rem, 10.75rem + 5.625vw, 17.5rem);
  }
  &__game-wrapper {
    display: flex;
    flex-direction: column;
    gap: 1.5rem;
    border: 2px solid var(--color-primary-6);
    border-radius: 0.625rem;
    background-color: var(--black);
    padding: 0.75rem;
    padding-bottom: 1rem;
    transition: filter 0.3 ease;
    &--black {
      filter: brightness(0.3);
      pointer-events: none;
    }
  }
  &__decor {
    position: absolute;
    bottom: -2rem;
    opacity: 0.35;
    z-index: -1;
    &--left {
      left: -1.7rem;
      transform: rotateY(180deg);
    }
    &--right {
      right: -1.7rem;
    }
  }
}

// media
@include media-query-ssm {
  .demo {
    &__game-block {
      width: 100%;
    }
  }
}
</style>
