<template>
  <div class="max-w-[800px] mx-auto pt-2">
    <h3 class="text-gray-700 text-2xl font-medium">{{ config.name }}</h3>
    
    <template v-if="!!items.length">
      <div class="my-6">
        <Table
          :items="items"
          :columns="columns"
          id-key="id"
          :actions="actions"
          @on-open="handleOpen"
        />
      </div>
    </template>

    <template v-else-if="!isLoading">
      <p>Empty {{ config.name }} list</p>
    </template>

    <template v-if="isLoading">
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
import Table from '@common/table/Table.vue';
import Spinner from '@common/spinner/Spinner.vue';
import { AppRouteNames } from '@enums/route';

const router = useRouter();
const { items, isLoading, fetchAll } = useCrud<IClient>(config);

const handleOpen = (id: number, routeName: AppRouteNames) => {
  router.push({ name: routeName, params: { id }});
}

onMounted(() => {
  fetchAll();
});
</script>