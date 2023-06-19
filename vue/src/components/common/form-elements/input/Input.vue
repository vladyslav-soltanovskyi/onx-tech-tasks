<template>
  <div :class="containerClassName ?? ''">
    <label :for="name" class="label">
      {{ label }}
      <template v-if="isRequired">
        <span class="text-red-600">*</span>
      </template>
    </label>
    <div class="input__container">
      <input
        class="input"
        :id="name"
        :type="type"
        :name="name"
        :placeholder="placeholder"
        :class="inputClasses"
        :value="value"
        @input="(e) => emit('update:value', (e.target as HTMLInputElement).value)"
      >
      <template v-if="withIcon">
        <button class="icon" :class="iconClassName" @click="emit('onClickIcon')">
          <Icon :name="iconName" />
        </button>
      </template>
    </div>
    <template v-if="!!error">
      <label class="error">{{ error }}</label>
    </template>
  </div>
</template>

<script setup lang="ts">
import Icon from '@common/icon/Icon.vue';
import { computed } from 'vue';
import type { IInputProps } from '@types-app/index';

const emit = defineEmits(['update:value', 'onClickIcon'])
const props = defineProps<IInputProps>();

const inputClasses = computed(() => {
  return {
    'error': !!props.error,
    'with-icon': !!props.withIcon
  }
});
</script>

<style lang="scss" scoped>
.label {
  @apply block mb-2 text-sm font-medium text-gray-900 dark:text-white;
}

.input {
  @apply border border-gray-300 text-gray-900 sm:text-sm rounded-lg block w-full p-2.5 outline-none dark:border-gray-600 dark:placeholder-gray-400 dark:text-white;

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

.icon {
  @apply flex items-start border-none outline-none bg-transparent justify-center absolute h-5 w-5 -translate-y-1/2 text-gray-400 top-1/2 right-3;
}
.error {
  @apply text-base text-red-500;
}
</style>