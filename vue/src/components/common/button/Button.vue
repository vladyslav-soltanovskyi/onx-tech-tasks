<template>
  <button
    class="button"
    :disabled="disabled"
    :name="name"
    :class="classes"
    @click="onClick"
    :type="type"
  >
    <slot></slot>
  </button>
</template>

<script setup lang="ts">
import { computed } from 'vue';

interface IButtonProps {
  isFull?: boolean;
  disabled?: boolean;
  name?: string;
  type?: 'button' | 'submit';
  className?: string;
}
const props = defineProps<IButtonProps>();

const classes = computed(() => {
  return [
    props.className,
    {
      'button_full': !!props.isFull
    }
  ]
})

const emit = defineEmits(['click']);

const onClick = () => emit('click');

</script>

<style scoped lang="scss">
.button {
  @apply text-white bg-green-500 hover:bg-green-700 focus:ring-4 focus:outline-none focus:ring-green-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-green-600 dark:hover:bg-green-700 dark:focus:ring-green-800;
  
  &_full {
    @apply w-full;
  }

  &:disabled {
    @apply opacity-30 cursor-not-allowed;
  }
}
</style>