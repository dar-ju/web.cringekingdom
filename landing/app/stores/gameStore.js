import { ref } from 'vue'
import { defineStore } from 'pinia'

export const useGameStore = defineStore('game', () => {
  const words = [
    {
      id: 1,
      image: 'word1.webp',
      word: 'волкраб',
      answer: 'волк + краб',
      letters: 'асловмрбклопд'
    },
    {
      id: 2,
      image: 'word2.webp',
      word: 'хлебедь',
      answer: 'хлеб + лебедь',
      letters: 'еьхенлсевбдкп'
    },
    {
      id: 3,
      image: 'word3.webp',
      word: 'зебрадио',
      answer: 'зебра + радио',
      letters: 'иабкридерзоме'
    },
    {
      id: 4,
      image: 'word4.webp',
      word: 'орелка',
      answer: 'орел + елка',
      letters: 'лкаюнвориеаод'
    },
    {
      id: 5,
      image: 'word5.webp',
      word: 'грибал',
      answer: 'гриб + бал',
      letters: 'лрасопилегбдн'
    },
  ]

  const modal = ref('') // help и message
  const errMessage = ref('')
  const helpArrow = ref(true)

  const currentWordIndex = ref(0)
  const animateStatus = ref('') // статус для анимации
  const typedWord = ref([]);
  const keyBoardLetters = ref([])
  const isGuessed = ref(false)

  return {
    words,
    modal,
    errMessage,
    helpArrow,
    currentWordIndex,
    animateStatus,
    typedWord,
    keyBoardLetters,
    isGuessed
  }
})
