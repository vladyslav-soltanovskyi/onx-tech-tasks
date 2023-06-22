<template>
  <div :class="containerClassName ?? ''">
    <label :for="name" class="label">
      {{ label }}
      <template v-if="isRequired">
        <span class="text-red-600">*</span>
      </template>
    </label>
    <div class="textarea__container">
      <textarea
        class="textarea"
        :name="name"
        :rows="rows ?? 6"
        :placeholder="placeholder"
        :class="inputClasses"
        :value="value"
        :autocomplete="autocomplete"
        @input="(e) => emit('update:value', (e.target as HTMLInputElement).value)"
      />
    </div>
    <template v-if="!!error">
      <label class="error">{{ error }}</label>
    </template>
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue';
import type { ITextareaProps } from '@types-app/index';

const emit = defineEmits(['update:value', 'onClickIcon'])
const props = defineProps<ITextareaProps>();

const inputClasses = computed(() => {
  return {
    'error': !!props.error
  }
});
</script>

<style lang="scss" scoped>
.label {
  @apply block mb-2 text-sm font-medium text-gray-900 dark:text-white;
}

.textarea {
  @apply border resize-none border-gray-300 text-gray-900 sm:text-sm rounded-lg block w-full p-2.5 outline-none dark:border-gray-600 dark:placeholder-gray-400 dark:text-white;

  &:focus {
    @apply border-neutral-600;
  }

  &.error {
    @apply border-red-500;
  }

  &__container {
    @apply relative;
  }
}

.error {
  @apply text-base text-red-500;
}
</style>