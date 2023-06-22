<template>
  <TableWidget
    id-key="id"
    :title="config.name"
    :items="items"
    :total-items="totalItems"
    :columns="columns"
    :actions="actions"
    :is-loading="isLoading"
    :is-sending="isSending"
    :fetch-records="fetchAll"
    :delete-record="deleteItem"
    @on-open="handleOpen"
    @on-edit="handleEdit"
    @on-create="handleCreate"
  />
</template>

<script setup lang="ts">
import { useCrud } from '@hooks/useCrud';
import { IClient } from '@types-app/index';
import { config, columns, actions } from './data';
import { useRouter } from 'vue-router'
import { AppRouteNames } from '@enums/route';
import TableWidget from '@common/table/TableWidget.vue';

const router = useRouter();

const { items, totalItems, isLoading, fetchAll, deleteItem, isSending } = useCrud<IClient>(config);

const handleOpen = (id: number, routeName: AppRouteNames) => {
  router.replace({ name: routeName, params: { id } });
}

const handleCreate = () => {
  router.replace({ name: AppRouteNames.CREATE_CLIENT });
}

const handleEdit = (id: number, routeName: AppRouteNames) => {
  console.log(routeName);
  router.replace({ name: routeName, params: { id } });
}
</script>