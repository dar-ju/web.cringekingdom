<script setup>
import { useGameStore } from "~/stores/gameStore";

const gameStore = useGameStore();

const formWord = () => {
  gameStore.typedWord = new Array(gameStore.words[gameStore.currentWordIndex].word.length).fill(
    null,
  );
};
onMounted(() => {
  formWord();
});

watch(
  () => gameStore.currentWordIndex,
  async (newVal) => {
    if (gameStore.currentWordIndex + 1 > gameStore.words.length) return;
    if (newVal || newVal === 0) formWord();
  },
);
watch(
  () => gameStore.typedWord,
  async (newVal) => {
    const targetLength = gameStore.words[gameStore.currentWordIndex].word.length;
    const isFull = newVal.length === targetLength && newVal.every((slot) => slot !== null);
    if (isFull) {
      const wordReal = gameStore.words[gameStore.currentWordIndex].word;
      const wordGuessed = newVal.map((item) => item.char).join("");
      if (wordReal === wordGuessed) {
        setTimeout(async () => {
          // если последняя буква верная - победа
          gameStore.isGuessed = true;
          gameStore.typedWord = new Array(
            gameStore.words[gameStore.currentWordIndex].word.length,
          ).fill(null);
        }, 500);
      } else {
        // Если слово полное, но неверное — трясем экран
        gameStore.animateStatus = "error";
        setTimeout(() => {
          gameStore.animateStatus = "";
        }, 500);
      }
    }
  },
  { deep: true },
);

const lettersCount = () => {
  if (gameStore.currentWordIndex + 1 > gameStore.words.length) return;
  return gameStore.words[gameStore.currentWordIndex].word.length;
};

const pushWordLetter = (slot, index) => {
  if (!slot) return; // если нажато на пустое поле
  gameStore.keyBoardLetters[slot.originIndex].isHidden = false;
  gameStore.typedWord[index] = null;
};
</script>

<template>
  <ul
    class="line__word-wrapper"
    :style="
      (`grid-template-columns: repeat(${lettersCount()}, 1fr)`,
      lettersCount() > 9 ? 'gap: 3px' : 'gap: 5px')
    "
    :data-status="gameStore.animateStatus"
    role="group"
    aria-label="Слово"
  >
    <li v-for="(slot, index) in gameStore.typedWord" :key="index">
      <button
        @click="pushWordLetter(slot, index)"
        class="line__word-letter"
        :style="
          lettersCount() > 9
            ? 'border: 1px solid var(--grey-lite);'
            : 'border: 2px solid var(--grey-lite);'
        "
        :aria-disabled="!slot?.char"
        :aria-label="slot?.char ? slot?.char : 'Место для буквы'"
        :tabindex="slot?.char ? 0 : -1"
        type="button"
      >
        <Transition name="bounce">
          <span class="line__word-letter-text" v-show="slot" :key="index">
            {{ slot?.char || "" }}
          </span>
        </Transition>
      </button>
    </li>
  </ul>
</template>

<style lang="scss" scoped>
.line {
  &__word-wrapper {
    display: flex;
    justify-content: center;
    width: 100%;
    &[data-status="error"] {
      animation: shakeError 1s ease-in-out;
    }
  }
  &__word-letter {
    position: relative;
    width: clamp(2rem, 1.375rem + 3.125vw, 2.5rem);
    min-height: clamp(2rem, 1.375rem + 3.125vw, 2.5rem);
    background: var(--blue-dark);
    border-radius: 8px;
    display: flex;
    justify-content: center;
    align-items: center;
    cursor: pointer;
  }
  &__word-letter-text {
    position: absolute;
    font-family: "Tahoma", sans-serif;
    font-size: clamp(1rem, 0.75rem + 1.25vw, 1.2rem);
    font-weight: 700;
    color: var(--grey-liter);
    text-transform: capitalize;
    animation: zoomIn 0.2s ease-out;
  }
}

// ANIMATION
@keyframes shakeError {
  10%,
  90% {
    transform: translate3d(-1px, 0, 0);
  }
  20%,
  80% {
    transform: translate3d(2px, 0, 0);
  }
  30%,
  50%,
  70% {
    transform: translate3d(-4px, 0, 0);
  }
  40%,
  60% {
    transform: translate3d(4px, 0, 0);
  }
}

@keyframes zoomIn {
  0% {
    opacity: 0;
    transform: scale(0.6);
  }
  100% {
    opacity: 1;
    transform: scale(1);
  }
}
</style>
