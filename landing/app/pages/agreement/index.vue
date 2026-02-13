<script setup>
useSeoMeta({
  title: "Пользовательское соглашение",
  ogTitle: "Пользовательское соглашение",
  description: "Пользовательское соглашение игры и сайта Королевство Кривословия",
  ogDescription: "Пользовательское соглашение игры и сайта Королевство Кривословия",
  ogUrl: "https://cringekingdom.darju.ru/agreement",
  ogType: "website",
});
</script>

<template>
  <main class="main">
    <section class="agree">
      <div class="container agree__container">
        <h1 class="agree__title agree__title--main">Пользовательское соглашение</h1>
        <ul class="agree__list">
          <li>Дата последнего обновления: 12.02.2026</li>
          <li>Разработчик: Немков Андрей Игоревич</li>
          <li>Email: cringekingdom@darju.ru</li>
          <li>Сайт: https://cringekingdom.darju.ru</li>
        </ul>

        <h2 class="agree__title agree__title--sub">1. Общие положения</h2>
        <ul class="agree__list">
          <li>Настоящее соглашение регулирует использование игры «Крутая игра».</li>
          <li>Используя игру, пользователь соглашается с условиями.</li>
          <li>Игра предназначена для лиц 13 лет и старше.</li>
        </ul>

        <h2 class="agree__title agree__title--sub">2. Лицензия</h2>
        <ul class="agree__list">
          <li>
            Пользователю предоставляется ограниченная, неисключительная лицензия на использование
            игры для личных целей.
          </li>
          <li>
            <span>Запрещается:</span>
            <ul class="agree__list-markerd">
              <li>копирование</li>
              <li>взлом</li>
              <li>декомпиляция</li>
              <li>распространение</li>
              <li>модификация</li>
            </ul>
          </li>
          <li>Игра не требует регистрации.</li>
        </ul>

        <h2 class="agree__title agree__title--sub">3. Внутриигровые покупки</h2>
        <ul class="agree__list">
          <li>В игре доступны покупки виртуальной валюты.</li>
          <li>
            <span>Покупки обрабатываются через:</span>
            <ul class="agree__list-markerd">
              <li>App Store</li>
              <li>Google Play</li>
            </ul>
          </li>
          <li>
            Все платежи окончательные, если иное не предусмотрено правилами соответствующего
            магазина приложений.
          </li>
          <li>
            <span>Виртуальная валюта:</span>
            <ul class="agree__list-markerd">
              <li>не имеет реальной стоимости</li>
              <li>не подлежит обмену на деньги</li>
            </ul>
          </li>
        </ul>

        <h2 class="agree__title agree__title--sub">4. Реклама</h2>
        <ul class="agree__list">
          <li>
            <span>В игре может отображаться реклама:</span>
            <ul class="agree__list-markerd">
              <li>баннерная</li>
              <li>за вознаграждение</li>
            </ul>
          </li>
          <li>Пользователь соглашается на показ рекламы при использовании игры.</li>
        </ul>

        <h2 class="agree__title agree__title--sub">5. Обновления игры</h2>
        <ul class="agree__list">
          <li>
            <span>Разработчик может:</span>
            <ul class="agree__list-markerd">
              <li>изменять игру</li>
              <li>добавлять функции</li>
              <li>удалять функции</li>
              <li>обновлять правила</li>
            </ul>
          </li>
          <li>Без предварительного уведомления.</li>
        </ul>

        <h2 class="agree__title agree__title--sub">6. Ограничение ответственности</h2>
        <ul class="agree__list">
          <li>Игра предоставляется «как есть».</li>
          <li>
            <span>Разработчик не несёт ответственности за:</span>
            <ul class="agree__list-markerd">
              <li>ошибки</li>
              <li>сбои</li>
              <li>потерю прогресса</li>
              <li>невозможность использования</li>
            </ul>
          </li>
          <li>В максимально допустимой законом степени.</li>
        </ul>

        <h2 class="agree__title agree__title--sub">7. Прекращение использования</h2>
        <p class="agree__descr">
          Пользователь может прекратить использование игры в любой момент, удалив её.
        </p>

        <h2 class="agree__title agree__title--sub">8. Изменения соглашения</h2>
        <ul class="agree__list">
          <li>Соглашение может обновляться.</li>
          <li>Продолжение использования игры означает согласие с новой версией.</li>
        </ul>

        <h2 class="agree__title agree__title--sub">9. Применимое право</h2>
        <p class="agree__descr">К соглашению применяется право Российской Федерации.</p>

        <h2 class="agree__title agree__title--sub">10. Контакты</h2>
        <p class="agree__descr">По всем вопросам: cringekingdom@darju.ru</p>
      </div>
    </section>
  </main>
</template>

<style lang="scss" scoped>
@use "@/assets/styles/breakpoints" as *;
.agree {
  padding-top: 7rem;
  padding-bottom: 3rem;
  color: var(--white);
  &__container {
    align-items: flex-start;
  }
  &__title {
    line-height: 100%;
    color: var(--color-primary-4);
    margin-bottom: 1rem;
    &--main {
      text-transform: uppercase;
    }
  }
  &__list {
    display: flex;
    flex-direction: column;
    gap: 0.7rem;
    margin-bottom: 1rem;
  }
  &__list-markerd {
    list-style: disc;
    padding-left: 1rem;
  }
  &__descr {
    margin-bottom: 1rem;
  }
}

@include media-query-ssm {
  .agree {
    &__title {
      &--main {
        font-size: 1.1rem;
      }
      &--sub {
        font-size: 1rem;
      }
    }
  }
}
</style>
