<template>
  <button class="back" @click="onBack">
    <Icon name="faChevronLeft" size="xs" />
    <span class="text">Back</span>
  </button>
</template>

<script setup lang="ts">
import { useRouter } from 'vue-router';
import Icon from '@common/icon/Icon.vue';

const router = useRouter();
const onBack = () => router.back();
</script>

<style lang="scss" scoped>
.back {
  @apply border-none outline-none text-neutral-600 flex items-center;

  .text {
    @apply ml-2 text-base;
  }
}
</style>