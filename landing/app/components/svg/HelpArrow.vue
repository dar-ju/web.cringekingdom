<script setup>
const props = defineProps({
  fill: String,
  width: String,
  height: String,
  bcg: String,
});
</script>

<template>
  <svg width="52" height="53" viewBox="0 0 52 53" fill="none" xmlns="http://www.w3.org/2000/svg">
    <g filter="url(#filter0_d_174_2)">
      <path
        d="M35.7088 -4.19319e-05L13.0814 22.6274L3.18191 12.7279L-7.1466e-05 50.5581L37.4766 47.0226L27.9306 37.4766L50.5581 14.8492L35.7088 -4.19319e-05Z"
        fill="#150B05"
      />
      <path
        d="M2.19375 48.3422L4.81433 17.1887L13.0814 25.4558L35.7088 2.82839L47.7296 14.8492L25.1022 37.4766L33.0565 45.4309L2.19375 48.3422Z"
        stroke="#AF6F25"
        stroke-width="4"
      />
    </g>
    <defs>
      <filter
        id="filter0_d_174_2"
        x="0"
        y="0"
        width="51.5581"
        height="52.5581"
        filterUnits="userSpaceOnUse"
        color-interpolation-filters="sRGB"
      >
        <feFlood flood-opacity="0" result="BackgroundImageFix" />
        <feColorMatrix
          in="SourceAlpha"
          type="matrix"
          values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0"
          result="hardAlpha"
        />
        <feOffset dx="1" dy="2" />
        <feComposite in2="hardAlpha" operator="out" />
        <feColorMatrix
          type="matrix"
          values="0 0 0 0 0.298039 0 0 0 0 0.301961 0 0 0 0 0.298039 0 0 0 1 0"
        />
        <feBlend mode="normal" in2="BackgroundImageFix" result="effect1_dropShadow_174_2" />
        <feBlend mode="normal" in="SourceGraphic" in2="effect1_dropShadow_174_2" result="shape" />
      </filter>
    </defs>
  </svg>
</template>
