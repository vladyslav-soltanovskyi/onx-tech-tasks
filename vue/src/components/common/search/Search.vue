<template>
  <form class="search" @submit.prevent="onSubmit">
    <Input
      v-bind="props"
      :value="searchValue"
      @update:value="onChange"
    />
    <Button type="submit" class-name="ml-2">Search</Button>
  </form>
</template>

<script setup lang="ts">
import { IInputProps } from '@types-app/form';
import Input from '@common/form-elements/input/Input.vue';
import Button from '@common/button/Button.vue';
import { computed } from 'vue';

const props = defineProps<IInputProps>();

const emit = defineEmits<{
  (e: 'update:value', value: string): void,
  (e: 'on-submit', value: string): void
}>();


const searchValue = computed({
  get() {
    return props.value;
  },
  set(value) {
    emit('update:value', value)
  }
});

const onChange = (value: string) => {
  searchValue.value = value;
}

const onSubmit = () => {
  emit('on-submit', searchValue.value);
}
</script>

<style scoped lang="scss">
.search {
  @apply flex items-center;
}
</style>