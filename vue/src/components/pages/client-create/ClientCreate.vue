<template>
  <div class="max-w-[700px] mx-auto px-3">
    <Back />
    <h2 class="my-3 text-lg font-bold">Create Client</h2>
    <GenerateForm
      :fields="fieldsRef"
      :validation-schema="clientSchema"
      :is-sending="isSending"
      :btn-text="btnText"
      @on-submit="handleSubmit"
    />
  </div>
  <template v-if="isLoading || isSending">
    <Spinner />
  </template>
</template>

<script setup lang="ts">
import GenerateForm from '@common/generate-form/GenerateForm.vue';
import { computed, onMounted, ref, watch } from 'vue';
import { fields, clientsConfig, employeesConfig } from  './data';
import { clientSchema } from '@validation-schemas/index';
import { useCrud } from '@hooks/useCrud';
import { IEmployee } from '@types-app/employee';
import { getOptionsValues } from '@helpers/get-options-values';
import { ICLientCreate } from '@types-app/client';
import Spinner from '@common/spinner/Spinner.vue';
import Back from '@common/back/Back.vue';

const { items, fetchAll, isLoading } = useCrud<IEmployee>(employeesConfig);
const { createItem, isSending } = useCrud<{}, {}, ICLientCreate>(clientsConfig);

const fieldsRef = ref(fields);

const handleSubmit = (values: ICLientCreate, resetForm: () => void) => {
  createItem(values).then(() => resetForm());
}

const btnText = computed(() => {
  return isSending.value ? 'Sending' : 'Create';
});

onMounted(() => {
  fetchAll();
});

watch(() => items.value, () => {
  fieldsRef.value.forEach((field) => {
    if (field.type === 'select' && field.valueKey === 'employee_id') {
      field.options = getOptionsValues<IEmployee>(items.value, 'id', ['name', 'surname']);
    }
  });
});
</script>