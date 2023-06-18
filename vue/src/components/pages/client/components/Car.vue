<template>
  <div class="car">
    <p class="">{{ brand }} · {{ model }} · {{ year }} · {{ color }}</p>
  </div>
</template>

<script setup lang="ts">
import { ICar } from '@types-app/index';

defineProps<ICar>();
</script>

<style scoped lang="scss">
.car {
  @apply bg-neutral-200 rounded-xl border-neutral-100 border p-3 mt-2;

  &-content {
    @apply font-bold;
  }
}
</style>