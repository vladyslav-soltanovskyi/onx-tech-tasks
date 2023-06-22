<template>
  <template v-if="isLoading || isSending">
    <Spinner />
  </template>
  <template v-else>
    <h2 class="title">{{ title }}</h2>
    <GenerateForm
      :fields="fields"
      :validation-schema="validationSchema"
      :default-values="defaultValues"
      :is-sending="isSending"
      :mode="mode"
      :btn-text="btnText"
      @on-submit="handleSubmit"
    />
  </template>
</template>

<script setup lang="ts">
import { IGenerateForm, TFieldValues } from '@types-app/index';
import Spinner from '@common/spinner/Spinner.vue';
import GenerateForm from '@common/generate-form/GenerateForm.vue';
import { computed } from 'vue';

interface ICrudFormProps extends IGenerateForm {
  isLoading?: boolean;
  title: string;
}

const props = defineProps<ICrudFormProps>();

const emit = defineEmits<{
  (e: 'on-submit', data: TFieldValues, resetForm: () => void): void;
}>();

const handleSubmit = (values: TFieldValues, resetForm: () => void) => {
  emit('on-submit', values, resetForm);
}

const btnText = computed(() => {
  if (props.isSending) {
    return  'Sending...';
  }

  return props.btnText ?? 'Confirm';
});
</script>

<style lang="scss" scoped>

.title {
  @apply my-3 text-lg font-bold;
}
</style>