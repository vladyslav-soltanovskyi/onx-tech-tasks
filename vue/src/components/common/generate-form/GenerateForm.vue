<template>
  <form @submit="onSubmit">
    <template v-for="field in fields" :key="field.valueKey">
      <div class="form-group">
        <template v-if="field.type === 'input'">
          <Input
            v-bind="field"
            @update:value="(value) => onChageValue(field.valueKey, value)"
            :value="values[field.valueKey]"
            :error="chekcIsShowErrorField(field.valueKey) ? errors[field.valueKey] : ''"
            :name="field.valueKey"
          />
        </template>
  
        <template v-else-if="field.type === 'password'">
          <PasswordInput
            v-bind="field"
            @update:value="(value) => onChageValue(field.valueKey, value)"
            :value="values[field.valueKey]"
            :error="chekcIsShowErrorField(field.valueKey) ? errors[field.valueKey] : ''"
            :name="field.valueKey"
          />
        </template>
  
        <template v-else-if="field.type === 'select'">
          <Select
            v-bind="field"
            @update:value="(value) => onChageValue(field.valueKey, value)"
            :value="values[field.valueKey]"
            :error="chekcIsShowErrorField(field.valueKey) ? errors[field.valueKey] : ''"
            :name="field.valueKey"
          />
        </template>
  
        <template v-else-if="field.type === 'textarea'">
          <Textarea
            v-bind="field"
            @update:value="(value) => onChageValue(field.valueKey, value)"
            :value="values[field.valueKey]"
            :error="chekcIsShowErrorField(field.valueKey) ? errors[field.valueKey] : ''"
            :name="field.valueKey"
          />
        </template>
      </div>
    </template>
    <div class="flex flex-row-reverse mt-4">
      <Button type="submit" :disabled="isDisabledBtn || isSending">
        {{ btnText ?? 'Confirm' }}
      </Button>
    </div>
  </form>
</template>

<script setup lang="ts">
import { useForm } from 'vee-validate';
import { IGenerateForm, TFieldValues, TypeField, TypeValidationMode } from '@types-app/index';
import Input from '@common/form-elements/input/Input.vue';
import PasswordInput from '@common/form-elements/input/PasswordInput.vue';
import Select from '@common/form-elements/select/Select.vue';
import Textarea from '@common/form-elements/textarea/Textarea.vue';
import Button from '@common/button/Button.vue';
import { computed, reactive, ref, watch } from 'vue';
import { getDefaultValues } from '@helpers/get-default-values';

interface IGenerateFormProps {
  validationSchema?: IGenerateForm['validationSchema'];
  fields: IGenerateForm['fields'];
  defaultValues?: IGenerateForm['defaultValues'];
  btnText?: string;
  isSending?: boolean;
  mode?: TypeValidationMode;
}

const props = defineProps<IGenerateFormProps>();

const emit = defineEmits<{
  (e: 'on-submit', data: IGenerateFormProps['defaultValues'], resetForm: () => void): void;
}>();

const isSubmitted = ref(false);
const valuesIsChanged = reactive(getDefaultValues<TypeField<TFieldValues>>(props.fields, 'valueKey'));

const { handleSubmit, errors, resetForm, setFieldValue, values, validateField, meta, isSubmitting } = useForm<TFieldValues>({
  validationSchema: props.validationSchema,
  initialValues: props.defaultValues ?? getDefaultValues<TypeField<TFieldValues>>(props.fields, 'valueKey')
});

const resetFormState = () => {
  resetForm();
  isSubmitted.value = false;
}

const onChageValue = (key: string, value: string | number) => {
  !!props.validationSchema && validateField(key as never);
  if (!valuesIsChanged[key]) {
    valuesIsChanged[key] = true;
  }

  setFieldValue(key as never, value as never);
}

const onSubmit = handleSubmit(values => {
  !props.isSending && emit('on-submit', values, resetFormState);
});

const isDisabledBtn = computed(() => {
  const isNotValid = isSubmitted.value && !meta.value.valid;

  if (props.mode === 'submit') {
    return isNotValid;
  }

  const changedFields = Object.keys(valuesIsChanged).filter(key => valuesIsChanged[key]);
  const isFieldsNotValid = changedFields.some(key => !!errors.value[key]);

  return isFieldsNotValid || isNotValid;
});

const chekcIsShowErrorField = (key: string): boolean => {
  if (props.mode === 'submit') {
    return isSubmitted.value;
  }

  return valuesIsChanged[key] || isSubmitted.value;
}

watch(() => isSubmitting.value, () => {
  if (!isSubmitted.value) {
    isSubmitted.value = true;
  }
});
</script>

<style scoped lang="scss">
.form-group {
  &:not(:first-child) {
    @apply mt-4;
  }
}
</style>