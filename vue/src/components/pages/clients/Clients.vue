<template>
  <div class="max-w-[1000px] mx-auto pt-2">
    <div class="flex justify-between">
      <h3 class="text-gray-700 text-2xl font-medium">{{ config.name }}</h3>
      <Button @click="handleCreate">Create</Button>
    </div>

    <template v-if="!!items.length">
      <div class="my-6">
        <Table
          :items="items"
          :columns="columns"
          id-key="id"
          :actions="actions"
          @on-open="handleOpen"
          @on-edit="handleEdit"
          @on-delete="handleDelete"
        />
      </div>
    </template>

    <template v-else-if="!isLoading">
      <p>Empty {{ config.name }} list</p>
    </template>

    <template v-if="isLoading || isSending">
      <Spinner />
    </template>

  </div>
</template>

<script setup lang="ts">
import { useCrud } from '@hooks/useCrud';
import { IClient } from '@types-app/index';
import { onMounted } from 'vue';
import { config, columns, actions } from './data';
import { useRouter } from 'vue-router'
import { AppRouteNames } from '@enums/route';
import Table from '@common/table/Table.vue';
import Spinner from '@common/spinner/Spinner.vue';
import Button from '@common/button/Button.vue';

const router = useRouter();
const { items, isLoading, fetchAll, deleteItem, isSending } = useCrud<IClient>(config);

const handleOpen = (id: number, routeName: AppRouteNames) => {
  router.push({ name: routeName, params: { id }});
}

const handleCreate = () => {
  router.push({ name: AppRouteNames.CLIENT_CREATE });
}

const handleEdit = (id: number, routeName: AppRouteNames) => {
  router.push({ name: AppRouteNames.CLIENT_EDIT, params: { id } });
}

const handleDelete = async (id: number) => {
  await deleteItem(id);
  fetchAll();
}

onMounted(() => {
  fetchAll();
});
</script>