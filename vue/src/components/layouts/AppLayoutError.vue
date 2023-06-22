<template>
  <div class="wrapper">
    <Back />
    <slot />
  </div>
</template>

<script setup lang="ts">
import Back from '@common/back/Back.vue';
</script>