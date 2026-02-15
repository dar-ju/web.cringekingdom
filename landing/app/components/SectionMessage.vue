<script setup>
import { reactive, ref, computed } from "vue";
import { z } from "zod";
import { useGameStore } from "@/stores/gameStore";

const gameStore = useGameStore();

const loadTime = Date.now();

// схема Zod
const schema = z.object({
  fromName: z.string().trim().min(1, "Укажите Ваше имя для обращения.").max(50),
  // fromSurName: z.string().trim().min(1, "Укажите Вашу фамилию."),
  fromEmail: z
    .string()
    .trim()
    .min(1, "Укажите Ваш email для обратной связи.")
    .email("Укажите корректный email.")
    .max(100),
  subject: z.string().trim().min(1, "Укажите тему обращения.").max(200),
  text: z.string().trim().min(1, "Напишите сообщение.").max(5000),
  agreeCheck: z.boolean().refine((val) => val === true, {
    message: "Согласие с условиями обязательно.",
  }),
});

// реактивные данные
const values = reactive({
  fromName: "",
  fromSurName: "",
  fromEmail: "",
  subject: "",
  text: "",
  agreeCheck: false,
});

// состояние полей
const touched = reactive({});
const spinner = ref(false);

// ошибки Zod
const errors = computed(() => {
  const result = schema.safeParse(values);
  if (result.success) return {};

  return result.error.issues.reduce((acc, issue) => {
    const field = issue.path[0];
    acc[field] = issue.message;
    return acc;
  }, {});
});

const onFormSubmit = async (e) => {
  if (Date.now() - loadTime < 3000) return; // защита от ботов
  e.preventDefault();
  const result = schema.safeParse(values);
  if (!result.success) {
    Object.keys(values).forEach((key) => (touched[key] = true));
    return;
  }
  spinner.value = true;
  try {
    const response = await fetch("/send.php", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        a1: values.fromName,
        a2: values.fromEmail,
        a3: values.subject,
        a4: values.text,
        a5: values.fromSurName,
        sent_at: Date.now(),
        loaded_at: loadTime,
      }),
    });
    const data = await response.json();
    if (response.ok && data.status === "success") {
      gameStore.errMessage = "Сообщение отправлено. Спасибо за обращение!";
      gameStore.modal = "message";
      resetForm();
    } else {
      gameStore.errMessage = "Ошибка при отправке.";
      gameStore.modal = "message";
      throw new Error("Ошибка при отправке");
    }
  } catch (err) {
    console.error(err);
    gameStore.errMessage = "Не удалось отправить сообщение. Попробуйте позже.";
    gameStore.modal = "message";
  } finally {
    spinner.value = false;
  }
};

const resetForm = () => {
  Object.assign(values, { fromName: "", fromEmail: "", subject: "", text: "", agreeCheck: false });
  Object.keys(touched).forEach((key) => (touched[key] = false));
};
</script>

<template>
  <section id="message" class="message">
    <div class="container message__container">
      <div class="message__image-wrapper">
        <img src="/assets/images/form-background.webp" class="message__image" alt="" />
      </div>
      <h2 class="title message__title">Сообщение</h2>
      <div class="message__descr-block">
        <p class="message__descr">
          Если у&nbsp;вас есть вопросы, замечания, идеи или предложения, напишите в&nbsp;форме
          обратной связи.
        </p>
        <p class="message__descr">Все сообщения будут прочитаны.</p>
      </div>

      <form class="form" novalidate @submit="onFormSubmit">
        <div>
          <label class="form__label form__required" for="fromName">Ваше имя</label>
          <input
            v-model="values.fromName"
            class="form__input"
            type="text"
            id="fromName"
            placeholder="Ваше имя"
            @blur="touched.fromName = true"
          />
          <span v-if="touched.fromName && errors.fromName" class="form__warning">
            {{ errors.fromName }}
          </span>
        </div>

        <div class="form__surname">
          <label class="form__label form__required" for="fromSurName">Ваша фамилия</label>
          <input
            v-model="values.fromSurName"
            class="form__input"
            type="text"
            id="fromSurName"
            placeholder="Ваша фамилия"
            @blur="touched.fromSurName = true"
          />
          <span v-if="touched.fromSurName && errors.fromSurName" class="form__warning">
            {{ errors.fromSurName }}
          </span>
        </div>

        <div>
          <label class="form__label form__required" for="fromEmail">Email</label>
          <input
            v-model="values.fromEmail"
            class="form__input"
            type="email"
            id="fromEmail"
            placeholder="Email"
            @blur="touched.fromEmail = true"
          />
          <span v-if="touched.fromEmail && errors.fromEmail" class="form__warning">
            {{ errors.fromEmail }}
          </span>
        </div>

        <div>
          <label class="form__label form__required" for="subject">Тема</label>
          <input
            v-model="values.subject"
            class="form__input"
            type="text"
            id="subject"
            placeholder="Тема обращения"
            @blur="touched.subject = true"
          />
          <span v-if="touched.subject && errors.subject" class="form__warning">
            {{ errors.subject }}
          </span>
        </div>

        <div class="form__message">
          <label class="form__label form__required" for="text">Сообщение</label>
          <textarea
            v-model="values.text"
            class="form__input form__textarea"
            id="text"
            rows="4"
            placeholder="Сообщение"
            @blur="touched.text = true"
          ></textarea>
          <span v-if="touched.text && errors.text" class="form__warning">
            {{ errors.text }}
          </span>
        </div>

        <label class="form__agree" for="agreeCheck">
          <input
            v-model="values.agreeCheck"
            type="checkbox"
            class="form__agree-input"
            id="agreeCheck"
          />
          <span class="form__agree-text"
            >Даю согласие на обработку персональных данных согласно
            <NuxtLink to="/policy" class="form__policy"
              >Политике&nbsp;конфиденциальности</NuxtLink
            ></span
          >
          <span v-if="touched.agreeCheck && errors.agreeCheck" class="form__warning">
            {{ errors.agreeCheck }}
          </span>
        </label>
        <button class="btn btn-secondary form__btn" :disabled="spinner">
          <span :class="{ 'form__btn--sending': spinner }">{{
            spinner ? "Отправка..." : "Отправить"
          }}</span>
        </button>
      </form>
    </div>
  </section>
</template>

<style lang="scss" scoped>
@use "@/assets/styles/breakpoints" as *;
.message {
  padding-top: 3rem;
  padding-bottom: clamp(7rem, 6.4rem + 1.875vw, 10rem);
  z-index: 0;
  &__image-wrapper {
    position: absolute;
    right: -18rem;
    z-index: -1;
    &::after {
      content: "";
      position: absolute;
      inset: 0;
      background:
        linear-gradient(to top, rgba(0, 0, 0, 0) 60%, rgb(21, 11, 5) 100%),
        linear-gradient(to right, rgba(0, 0, 0, 0) 80%, rgb(21, 11, 5) 100%),
        linear-gradient(to bottom, rgba(0, 0, 0, 0) 60%, rgb(21, 11, 5) 100%),
        linear-gradient(to left, rgba(0, 0, 0, 0) 50%, rgb(21, 11, 5) 100%);

      pointer-events: none;
    }
  }
  &__image {
    max-height: 50rem;
  }
  &__container {
    position: relative;
  }
  &__title {
    margin-bottom: clamp(2rem, 1.8rem + 1vw, 3rem);
  }
  &__descr-block {
    display: flex;
    flex-direction: column;
    gap: 0.5rem;
    margin-bottom: clamp(1rem, 0.8rem + 1vw, 2rem);
  }
  &__descr {
    font-size: clamp(1rem, 0.8rem + 1vw, 2rem);
    line-height: 100%;
  }
}

/* FORM */
.form {
  display: flex;
  flex-direction: column;
  align-self: flex-start;
  gap: clamp(0.4rem, 0.28rem + 0.6vw, 1rem);
  max-width: 600px;
  width: 100%;
  &__surname {
    opacity: 0;
    position: absolute;
    z-index: -1;
    height: 0;
  }
  &__label {
    visibility: hidden;
  }
  &__required::after {
    content: "*";
    position: relative;
    left: 9px;
    color: var(--color-green-600-medium);
  }
  &__input {
    width: 100%;
    min-height: 3.75rem;
    padding-left: 1.7rem;
    border-radius: 7px;
    font-size: 1.25rem;
    outline: 1px solid var(--color-primary-6);
    transition: outline ease-in-out 0.3s;
    color: var(--white);
    background-color: var(--color-primary-6-20);
  }
  &__input:focus,
  .form__input:hover {
    outline: 1px solid var(--color-secondary-a-0);
  }
  &__textarea {
    padding: 11px 22px;
    font-size: 1.2rem;
    line-height: 1.7rem;
    border: none;
    resize: vertical;
  }
  &__message {
    margin-bottom: 1rem;
  }
  &__agree {
    display: inline-block;
    padding-left: 7px;
    margin-bottom: 1.8rem;
  }
  &__agree-input {
    margin-right: 14px;
    transform: scale(1.6);
    cursor: pointer;
  }
  &__agree input[type="checkbox"] {
    accent-color: var(--color-primary-3);
  }
  &__agree-text {
    font-size: clamp(0.8rem, 0.76rem + 0.125vw, 1rem);
    line-height: clamp(0.8rem, 0.66rem + 0.438vw, 1.5rem);
    cursor: pointer;
    color: var(--white);
  }
  &__btn {
    max-width: 300px;
    padding: clamp(1rem, 0.375rem + 0.625vw, 1.125rem) clamp(0.5rem, 0.4rem + 0.5vw, 1rem);
    &--sending {
      animation: smokeOut 1s ease-in-out infinite alternate;
    }
  }
  &__policy {
    color: var(--color-primary-4);
    font-weight: 700;
  }
  &__warning {
    position: absolute;
    color: var(--color-secondary-b-0);
    display: block;
    font-size: 12px;
    min-height: 14px;
  }
}

// Media
@include media-query-l {
  .message {
    &__image-wrapper {
      &::after {
        background:
          linear-gradient(to top, rgba(0, 0, 0, 0) 60%, rgb(21, 11, 5) 100%),
          linear-gradient(to right, rgba(0, 0, 0, 0) 0%, rgb(21, 11, 5) 100%),
          linear-gradient(to bottom, rgba(0, 0, 0, 0) 60%, rgb(21, 11, 5) 100%),
          linear-gradient(to left, rgba(0, 0, 0, 0) 50%, rgb(21, 11, 5) 100%);
      }
    }
  }
}
@include media-query-ssm {
  .form {
    &__btn {
      width: 100%;
      max-width: initial;
    }
  }
}

@keyframes smokeOut {
  100% {
    opacity: 0.08;
    filter: blur(5px);
    letter-spacing: 4px;
  }
}
</style>
