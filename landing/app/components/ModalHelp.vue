<script setup>
import { useGameStore } from "@/stores/gameStore";
import { onMounted, onUnmounted, watch } from "vue";

const gameStore = useGameStore();

const handleEsc = (e) => {
  if (e.key === "Escape") gameStore.modal = "";
};

onMounted(() => {
  window.addEventListener("keydown", handleEsc);
});
onUnmounted(() => {
  window.removeEventListener("keydown", handleEsc);
});
</script>

<template>
  <Transition name="fade">
    <div v-if="gameStore.modal" class="modal">
      <div class="modal__container" @click="gameStore.modal = ''">
        <div
          class="modal__window"
          @click.stop
          role="dialog"
          aria-modal="true"
          aria-labelledby="modal-title"
        >
          <button
            class="modal__window-close"
            @click="gameStore.modal = ''"
            aria-label="Закрыть модальное окно"
          ></button>
          <div v-if="gameStore.modal === 'help'" class="modal__wrapper">
            <h2 class="modal__title" id="modal-title">Как играть</h2>
            <ol class="modal__text modal__list">
              <li>Картинка состоит из 2 слов, у них общая буква или несколько букв.</li>
              <li>
                В слове общие буквы сокращаются. Например,
                <span class="modal__bold">рак + кот = ракот</span>.
              </li>
              <li>Ё заменяется на Е. Если в конце первого слова "Ь", то он опускается.</li>
            </ol>
          </div>
          <div v-else-if="gameStore.modal === 'message'" class="modal__wrapper">
            <h2 class="modal__title">Сообщение</h2>
            <p class="modal__text">{{ gameStore.errMessage }}</p>
          </div>
        </div>
      </div>
    </div>
  </Transition>
</template>

<style lang="scss" scoped>
.modal {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  z-index: 100;
  background-color: #000000bf;
  &__container {
    position: fixed;
    inset: 0;
    display: flex;
    justify-content: center;
    align-items: center;
    overflow-y: scroll;
  }
  &__window {
    position: relative;
    display: flex;
    flex-direction: column;
    align-items: center;
    width: 90%;
    max-width: 25rem;
    padding: 1rem 1.5rem;
    border-radius: 0.5rem;
    background: black;
    border: 1px solid var(--color-primary-2);
    color: var(--color-primary-4);
  }
  &__window-close {
    position: absolute;
    width: 24px;
    height: 24px;
    top: 5px;
    right: 5px;
    z-index: 1;
    &::after,
    &::before {
      content: "";
      position: absolute;
      top: 50%;
      left: 50%;
      width: 15px;
      height: 3px;
      background-color: var(--color-primary-2);
      transform-origin: center;
    }
    &::after {
      transform: translate(-50%, -50%) rotate(-45deg);
    }
    &::before {
      transform: translate(-50%, -50%) rotate(45deg);
    }
  }
  &__wrapper {
    position: relative;
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 0.5rem;
    margin-bottom: 1rem;
  }
  &__title {
    margin-bottom: 1rem;
  }
  &__text {
    font-size: clamp(0.8rem, 0.55rem + 1.25vw, 1rem);
    line-height: clamp(1rem, 0.5875rem + 1.29vw, 1.33rem);
  }
  &__list {
    display: flex;
    flex-direction: column;
    gap: 0.5rem;
    padding-left: 1rem;
    list-style: auto;
  }
  &__bold {
    font-weight: 700;
  }
}
</style>
