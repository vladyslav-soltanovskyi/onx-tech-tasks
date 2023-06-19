<template>
  <div :class="containerClassName ?? ''">
    <label :for="name" class="label">
      {{ label }}
      <template v-if="isRequired">
        <span class="text-red-600">*</span>
      </template>
    </label>
    <select class="select" @change="onSelect" :value="value">
      <template v-for="option in options" :key="option.value">
        <option :value="option.value">
          {{ option.text }}
        </option>
      </template>
    </select>
    <template v-if="!!error">
      <label class="error">{{ error }}</label>
    </template>
  </div>
</template>
<script setup lang="ts">
import type { ISelectProps } from '@types-app/index';

const props = defineProps<ISelectProps>();

const emit = defineEmits<{
  (e: 'update:value', selectedValue: number | string): void;
}>();

const onSelect = (e: Event) => {
  const target = e.target as HTMLSelectElement;
  emit('update:value', props.options[target.selectedIndex].value);
}
</script>

<style scoped lang="scss">
.select {
  @apply border border-gray-300 text-gray-900 text-base rounded-lg block w-full p-2.5 outline-none dark:border-gray-600 dark:placeholder-gray-400 dark:text-white;

  &:focus {
    @apply border-neutral-600;
  }

  &.error {
    @apply border-red-500;
  }

  &.with-icon {
    @apply pr-10; 
  }

  &__container {
    @apply relative;
  }
}

.error {
  @apply text-base text-red-500;
}
</style>