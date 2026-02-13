<script setup>
import { useGameStore } from "~/stores/gameStore";

const gameStore = useGameStore();

onMounted(() => {
  lettersForm();
});

watch(
  () => gameStore.currentWordIndex,
  async (newVal) => {
    if (gameStore.currentWordIndex + 1 > gameStore.words.length) return;
    if (newVal || newVal === 0) {
      lettersForm();
    }
  },
);

function lettersForm() {
  gameStore.keyBoardLetters = gameStore.words[gameStore.currentWordIndex].letters
    .split("")
    .map((char, index) => ({
      char: char,
      isHidden: false,
      originIndex: index, // сохраняем родной индекс для возврата
    }));
}

const pushKeyButton = async (item, index) => {
  if (item.isHidden) return;
  const emptyIndex = gameStore.typedWord.findIndex((slot) => slot === null);
  if (emptyIndex !== -1) {
    // кладем в слот объект, чтобы знать откуда вернут букву
    gameStore.typedWord[emptyIndex] = {
      char: item.char,
      originIndex: index,
    };
    item.isHidden = true; // скрываем кнопку
  }
  // Проверка победы (добавлена последняя буква)
  if (gameStore.typedWord.every((slot) => slot !== null)) {
    const isCorrect =
      gameStore.typedWord.map((s) => s.char).join("") ===
      gameStore.words[gameStore.currentWordIndex].word;
    if (!isCorrect) {
      // если последняя буква неверная
      // console.log("Неверно");
      const lastSlot = gameStore.typedWord[gameStore.typedWord.length - 1];
      setTimeout(() => {
        pushWordLetter(lastSlot, gameStore.typedWord.length - 1);
      }, 500);
    }
  }
  // console.log(gameStore.typedWord);
};

const pushWordLetter = (slot, index) => {
  if (!slot) return; // если нажато на пустое поле
  gameStore.keyBoardLetters[slot.originIndex].isHidden = false;
  gameStore.typedWord[index] = null;
};
</script>

<template>
  <TransitionGroup
    name="letters"
    tag="ul"
    class="side-paddings keyboard__letters-wrapper"
    appear
    role="group"
    aria-label="Клавиатура для ввода слова"
  >
    <li v-for="(item, index) in gameStore.keyBoardLetters" :key="index">
      <button
        @click="pushKeyButton(item, index)"
        class="keyboard__letter-btn"
        :class="{ 'keyboard__letter-btn--empty': item.isHidden }"
        :aria-disabled="item.isHidden"
        :aria-label="item.isHidden ? 'Выбранная буква' : item.char"
        :tabindex="item.isHidden ? -1 : 0"
        type="button"
      >
        <Transition name="bounce">
          <span v-if="!item.isHidden" :key="item.originIndex" class="keyboard__letter-btn-text">{{
            item.char
          }}</span>
        </Transition>
      </button>
    </li>
    <li :key="13">
      <button
        @click="gameStore.modal = 'help'"
        class="keyboard__letter-btn keyboard__letter-btn--help"
        aria-label="Правила игры"
        aria-haspopup="dialog"
        :aria-expanded="gameStore.modal === 'help'"
        type="button"
      >
        ?
      </button>
    </li>
  </TransitionGroup>
</template>

<style lang="scss" scoped>
.keyboard {
  &__letters-wrapper {
    display: grid;
    grid-template-columns: repeat(7, 1fr);
    gap: 8px;
    width: 100%;
    max-width: 500px;
  }
  &__letter-btn {
    aspect-ratio: 1 / 1;
    width: 100%;
    background: var(--grey-liter);
    color: var(--grey-dark);
    border-radius: clamp(0.3125rem, 0.078rem + 1.17vw, 0.5rem);
    font-family: "Tahoma", sans-serif;
    font-size: clamp(1.2rem, 0.2rem + 5vw, 2rem);
    text-transform: capitalize;
    font-weight: 700;
    text-shadow: 0.05rem 0.05rem 0.05rem white;
    box-shadow: 0px 2px 1px 1px var(--grey);
    display: flex;
    justify-content: center;
    align-items: center;
    cursor: pointer;
    &--help {
      background: #319310;
      text-shadow: 0.0625rem 0.0625rem 0.0625rem var(--grey-liter);
    }
    &--empty {
      background: var(--grey);
      pointer-events: none;
    }
    &__letter-btn-text {
      display: block;
    }
  }
}

// ANIMATION
@keyframes zoomOut {
  0% {
    transform: scale(1);
    opacity: 1;
  }
  100% {
    transform: scale(0);
    opacity: 0;
  }
}

@keyframes startGame {
  0% {
    transform: scale(0);
  }
  100% {
    transform: scale(1);
  }
}

.bounce-enter-active {
  animation: zoomIn 0.2s;
}
.bounce-leave-active {
  // position: absolute;
  text-shadow: none;
  animation: zoomOut 0.2s forwards;
  will-change: transform, opacity;
}
</style>
