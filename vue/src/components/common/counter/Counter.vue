<template>
  <div class="counter">
    <Button
      type="button"
      :disabled="isFirst"
      @click="decrement"
    >
      <Icon name="faChevronLeft" />
    </Button>
    <Input
      v-model:value="value"
      :ref-callback="(e) => inputRef = e"
      @on-blur="onBlur"
      @on-key-down="onKeyDown"
    />
    <Button
      type="button"
      :disabled="isLast"
      @click="increment"
    >
      <Icon name="faChevronRight" />
    </Button>
  </div>
</template>

<script setup lang="ts">
import { computed, ref, watch } from 'vue';
import Icon from '@common/icon/Icon.vue';
import Button from '@common/button/Button.vue';
import Input from '@common/form-elements/input/Input.vue';

interface ICounterProps {
  current: number;
  max?: number;
  min?: number;
}

const props = defineProps<ICounterProps>();
const emit = defineEmits<{
  (e: 'on-change', n: number): void
}>();

const inputRef = ref(null);

const min = computed(() => props.min ?? 1);
const max = computed(() => props.max ?? 5);

const value = ref(`${props.current}`);
const isLast = computed(() => props.current >= max.value);
const isFirst = computed(() => props.current <= min.value);

const applyCurrent = (num: number) => {
  const validNum = Math.max(min.value, Math.min(max.value, num));
  emit('on-change', validNum);
  value.value = `${validNum}`;
}

const onBlur = (e: Event) => {
  const target = e.target as HTMLInputElement;
  const num = +target.value.replace(/\D/g, '');
  applyCurrent(num);
}

const onKeyDown = (e: KeyboardEvent) => {
  switch (e.key) {
    case "ArrowUp": {
      applyCurrent(props.current + 1);
      break;
    }
    case "ArrowDown": {
      applyCurrent(props.current - 1);
      break;
    }
    case "Enter": {
      inputRef.value?.blur();
      break;
    }
  }
}

const increment = () => applyCurrent(props.current + 1);
const decrement = () => applyCurrent(props.current - 1);

watch(() => max.value, (max) => {
  if (+value.value > max) {
    value.value = `${max}`;
    emit('on-change', max);
  }
});

watch(() => props.current, (n) => {
  value.value = `${n}`;
})
</script>

<style scoped lang="scss">
.counter {
  @apply grid grid-cols-3 gap-2 w-[200px];
}
</style>