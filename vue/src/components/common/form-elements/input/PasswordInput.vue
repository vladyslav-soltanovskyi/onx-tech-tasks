<template>
  <Input
    v-bind="rest"
    :type="typeInput"
    :with-icon="true"
    :icon-name="iconName"
    :value="value"
    @update:value="(e) => emit('update:value', e)"
    @on-click-icon="toggleType"
  />
</template>

<script setup lang="ts">
import { computed, ref } from 'vue';
import Input from './Input.vue';
import type { IInputProps } from '@types-app/index';

const emit = defineEmits(['update:value', 'onClickIcon'])
const props = defineProps<IInputProps>();

const { type = 'password', ...rest } = props;
const isShowPassword = ref(false);

const iconName = computed(() => {
  return isShowPassword.value ? 'faEyeSlash' : 'faEye';
});

const typeInput = computed(() => {
  return isShowPassword.value ? 'text' : 'password';
});

const toggleType = () => {
  isShowPassword.value = !isShowPassword.value;
}
</script>