<template>
  <div :class="containerClassName ?? ''">
    <template v-if="!!label">
      <label :for="name" class="label">
        {{ label }}
        <template v-if="isRequired">
          <span class="text-red-600">*</span>
        </template>
      </label>
    </template>
    
    <select
      class="select"
      :value="value"
      :class="inputClasses"
      :aria-readonly="readonly"
      :disabled="disabled"
      :placeholder="placeholder"
      :autocomplete="autocomplete"
      @change="onSelect"
    >
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
import { computed } from 'vue';

const props = defineProps<ISelectProps>();
const emit = defineEmits<{
  (e: 'update:value', selectedValue: number | string): void;
}>();

const onSelect = (e: Event) => {
  const target = e.target as HTMLSelectElement;
  emit('update:value', props.options[target.selectedIndex].value);
}

const inputClasses = computed(() => {
  return {
    'error': !!props.error,
    'readonly': !!props.readonly
  }
});
</script>

<style scoped lang="scss">
.label {
  @apply block mb-2 text-sm font-medium text-gray-900 dark:text-white;
}

.select {
  @apply border border-gray-300 text-gray-900 text-base rounded-lg block p-2.5 outline-none dark:border-gray-600 dark:placeholder-gray-400 dark:text-white;

  &:focus {
    @apply border-neutral-600;
  }

  &.error {
    @apply border-red-500;
  }

  &.with-icon {
    @apply pr-10; 
  }

  &.readonly, &:disabled {
    @apply bg-neutral-100;
  }

  &__container {
    @apply relative;
  }
}

.error {
  @apply text-base text-red-500;
}
</style>