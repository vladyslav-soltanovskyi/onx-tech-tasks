<template>
  <CrudForm
    :fields="fieldsRef"
    :validation-schema="clientSchema"
    :is-sending="isSending"
    :is-loading="isLoading"
    btn-text="Create"
    title="Create Client"
    @on-submit="handleSubmit"
  />
</template>

<script setup lang="ts">
import { onMounted, reactive, watch } from 'vue';
import { fields, clientsConfig, employeesConfig } from  './data';
import { clientSchema } from '@validation-schemas/index';
import { IEmployee } from '@types-app/employee';
import { getOptionsValues } from '@helpers/get-options-values';
import { ICLientCreate } from '@types-app/client';
import { useCrud } from '@hooks/useCrud';
import CrudForm from '@common/crud-form/CrudForm.vue';

const { items, fetchAll, isLoading } = useCrud<IEmployee>(employeesConfig);
const { createItem, isSending } = useCrud<{}, {}, ICLientCreate>(clientsConfig);

const fieldsRef = reactive(fields);

const handleSubmit = (values: ICLientCreate, resetForm: () => void) => {
  createItem(values).then(() => resetForm());
}

onMounted(() => {
  fetchAll();
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