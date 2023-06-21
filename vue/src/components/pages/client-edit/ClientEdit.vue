<template>
  <CrudForm
    :fields="fieldsRef"
    :validation-schema="clientSchema"
    :default-values="defaultValues"
    :is-sending="isSending"
    :is-loading="isLoading || isClientLoading"
    btn-text="Edit"
    title="Edit Client"
    @on-submit="handleSubmit"
  />
</template>

<script setup lang="ts">
import { useRoute } from 'vue-router';
import { computed, onMounted, reactive, watch } from 'vue';
import { fields, clientsConfig, employeesConfig } from  './data';
import { clientSchema } from '@validation-schemas/index';
import { useCrud } from '@hooks/useCrud';
import { IEmployee } from '@types-app/employee';
import { getOptionsValues } from '@helpers/get-options-values';
import { ICLientCreate, IClient } from '@types-app/client';
import CrudForm from '@common/crud-form/CrudForm.vue';

const route = useRoute();
const { items, fetchAll, isLoading } = useCrud<IEmployee>(employeesConfig);
const { updateItem, isSending, isLoading: isClientLoading, item, fetchOne  } = useCrud<IClient, IClient, ICLientCreate>(clientsConfig);

const fieldsRef = reactive(fields);

const handleSubmit = (values: Partial<ICLientCreate>, resetForm: () => void) => {
  updateItem(+route.params.id, values).then(() => resetForm());
}

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

watch(() => items.value, (items) => {
  fieldsRef.forEach((field) => {
    const isSelectType = field.type === 'select';
    const isNotEmptyItems = !!items?.length;

    if (isSelectType && isNotEmptyItems && field.valueKey === 'employee_id') {
      field.options = getOptionsValues<IEmployee>(items, 'id', ['name', 'surname']);
    }
  });
});
</script>