<script setup></script>

<template>
  <section id="download" class="download">
    <div class="container">
      <h2 class="title download__title">Полная бесплатная версия</h2>
      <div class="download__block">
        <div class="download__links-block">
          <p class="download__text">Начать игру Королевтво Кривословия</p>
          <div class="download__stores">
            <NuxtLink to="#">
              <img
                src="/assets/images/badge-googleplay.webp"
                alt="Скачать игру Королевство Кривословия в Google Play"
                loading="lazy"
                width="239"
                height="71"
              />
            </NuxtLink>
            <NuxtLink to="#">
              <img
                src="/assets/images/badge-appstore.webp"
                alt="Скачать игру Королевство Кривословия в App Store"
                loading="lazy"
                width="239"
                height="71"
              />
            </NuxtLink>
          </div>
          <img
            src="/assets/images/word-decor-2.webp"
            class="download__decor"
            alt=""
            loading="lazy"
            width="467"
            height="86"
          />
        </div>
        <div class="download__qr-block">
          <img
            class="download__qr"
            src="/assets/images/qrcode.webp"
            alt="QR код для скачивания игры Королевство Кривословия"
            loading="lazy"
            width="314"
            height="314"
          />
        </div>
      </div>
    </div>
  </section>
</template>

<style lang="scss" scoped>
@use "@/assets/styles/breakpoints" as *;
.download {
  padding-top: 7rem;
  padding-bottom: clamp(3rem, 1rem + 10vw, 13rem);
  background: linear-gradient(
    0deg,
    rgba(21, 11, 5, 1) 9%,
    rgba(64, 36, 8, 1) 43%,
    rgba(64, 36, 8, 1) 57%,
    rgba(21, 11, 5, 1) 100%
  );
  &__title {
    margin-bottom: clamp(2rem, 1.8rem + 1vw, 3rem);
  }

  &__block {
    display: flex;
    justify-content: space-between;
    gap: 2rem;
    width: 100%;
    min-height: 30rem;
    padding: clamp(2.5rem, 1.82rem + 3.4vw, 5.9rem) clamp(2rem, 1.575rem + 2.125vw, 4.125rem);
    background:
      linear-gradient(90deg, rgb(21, 11, 5) 40%, rgba(0, 0, 0, 0) 100%),
      url("/assets/images/download-decor.webp") right/55% no-repeat,
      var(--black);
    background-size: contain;
    border-radius: 5px;
    z-index: 0;
  }
  &__links-block {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: space-between;
  }
  &__text {
    font-size: clamp(1rem, 0.8rem + 1vw, 2rem);
    color: var(--white);
    text-align: center;
    line-height: 100%;
  }
  &__stores {
    display: flex;
    gap: 2rem;
  }
  &__decor {
    opacity: 0.6;
  }
  &__qr-block {
    display: flex;
  }
  &__qr {
    object-fit: contain;
  }
}

// Media
@include media-query-l {
  .download {
    &__block {
      flex-direction: column;
      align-items: center;
      background:
        linear-gradient(127deg, rgb(21, 11, 5) 40%, rgba(0, 0, 0, 0) 100%),
        url(/assets/images/download-decor.webp) center right / 55% no-repeat,
        var(--black);
      background-size: cover;
    }
    &__links-block {
      gap: clamp(3rem, 2.545rem + 2.273vw, 4rem);
      margin-bottom: clamp(0rem, -1.364rem + 6.818vw, 3rem);
    }
  }
}

@include media-query-sm {
  .download {
    &__stores {
      flex-wrap: wrap;
      justify-content: center;
    }
  }
}
</style>
