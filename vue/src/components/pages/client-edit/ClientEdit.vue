<template>
  <template v-if="!isClientLoading && !isSending">
    <div class="max-w-[700px] mx-auto px-3">
      <Back />
      <h2 class="my-3 text-lg font-bold">Edit Client</h2>
      <GenerateForm
        :fields="fieldsRef"
        :validation-schema="clientSchema"
        :default-values="defaultValues"
        :is-sending="isSending"
        :btn-text="btnText"
        @on-submit="handleSubmit"
      />
    </div>
  </template>
  <template v-if="isLoading || isSending || isClientLoading">
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
import { ICLientCreate, IClient } from '@types-app/client';
import Spinner from '@common/spinner/Spinner.vue';
import Back from '@common/back/Back.vue';
import { useRoute } from 'vue-router';

const route = useRoute();
const { items, fetchAll, isLoading } = useCrud<IEmployee>(employeesConfig);
const { updateItem, isSending, isLoading: isClientLoading, item, fetchOne  } = useCrud<IClient, IClient, ICLientCreate>(clientsConfig);

const fieldsRef = ref(fields);

const handleSubmit = (values: Partial<ICLientCreate>, resetForm: () => void) => {
  updateItem(+route.params.id, values).then(() => resetForm());
}

const btnText = computed(() => {
  return isSending.value ? 'Sending' : 'Edit';
});

const defaultValues = computed(() => {
  return {
    name: item.value?.name ?? '',
    surname: item.value?.surname ?? '',
    address: item.value?.address ?? '',
    employee_id: item.value?.employee_id?.toString() ?? '',
    email: item.value?.email ?? ''
  };
});

onMounted(() => {
  fetchAll();
  fetchOne(+route.params.id);
});

watch(() => items.value, () => {
  fieldsRef.value.forEach((field) => {
    if (field.type === 'select' && field.valueKey === 'employee_id') {
      field.options = getOptionsValues<IEmployee>(items.value, 'id', ['name', 'surname']);
    }
  });
});
</script>