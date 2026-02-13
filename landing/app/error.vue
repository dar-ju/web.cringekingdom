<script setup>
// Nuxt автоматически передает пропс error
const props = defineProps({
  error: Object,
});

// Функция для очистки ошибки и редиректа
const handleError = () => clearError({ redirect: "/" });

onMounted(() => {
  if (typeof window.ym === "function") {
    window.ym(config.metrikaId, "hit", "/404", { title: "Страница не найдена" });
  }
});
</script>

<template>
  <div class="error-page">
    <h1 class="error-page__title">{{ error.statusCode }}</h1>
    <p class="error-page__message">Эта страница пока не существует.</p>
    <button class="btn btn-primary" @click="handleError">Вернуться на главную</button>
  </div>
</template>

<style scoped lang="scss">
.error-page {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 100vh;
  text-align: center;
  padding: 20px;
  &__title {
    font-size: clamp(5rem, 15vw, 10rem);
    margin-bottom: 3rem;
  }
  &__message {
    font-size: 1.5rem;
    margin-bottom: 2rem;
  }
}
</style>
