<template>
  <div class="wrapper">

    <div class="header-row">
      <h3 class="title">{{ config.name }}</h3>
      <Button @click="handleCreate">Create</Button>
    </div>

    <div class="header-row">
      <Select
        label="Records"
        @update:value="onSelectLimit"
        :value="limit"
        :options="limitOptions"
      />
      <Search
        v-model:value.lazy="inputSearchString"
        @on-submit="search"
      />
    </div>

    <template v-if="!!items?.length">
      <div class="table-container">
        <Table
          :items="items"
          :columns="columns"
          id-key="id"
          :actions="actions"
          :sort-by="sortBy"
          :order-by="orderBy"
          @sort-change="handleSortChange"
          @on-open="handleOpen"
          @on-edit="handleEdit"
          @on-delete="handleDelete"
        />
      </div>
    </template>

    <template v-else-if="!isLoading">
      <p>Empty {{ config.name }} list</p>
    </template>
    
    <Pagination
      :page="page"
      @on-change="onChange"
      :total-pages="totalPages"
      :total-records="totalItems"
      :page-limit="limit"
    />

    <template v-if="isLoading || isSending">
      <Spinner />
    </template>
  </div>
</template>

<script setup lang="ts">
import { useCrud } from '@hooks/useCrud';
import { IClient, TAvailableSorting, FilterQueryParams } from '@types-app/index';
import { computed, ref, watch, watchEffect } from 'vue';
import { config, columns, actions, limitOptions } from './data';
import { useRouter, useRoute } from 'vue-router'
import { AppRouteNames } from '@enums/route';
import Table from '@common/table/Table.vue';
import Spinner from '@common/spinner/Spinner.vue';
import Button from '@common/button/Button.vue';
import Pagination from '@common/pagination/Pagination.vue';
import Search from '@common/search/Search.vue';
import Select from '@common/form-elements/select/Select.vue';

const router = useRouter();
const route = useRoute();

const { items, totalItems, isLoading, fetchAll, deleteItem, isSending } = useCrud<IClient>(config);

const filterQuery: FilterQueryParams<IClient> = route.query;

const sortBy = ref<string>(filterQuery?.sortBy ?? '');
const orderBy = ref<TAvailableSorting>(filterQuery?.orderBy ?? '');
const limit = ref(filterQuery?.limit ?? limitOptions[0].value);
const page = ref<number>(
  Number.isInteger(+filterQuery?.page)
    ? +filterQuery?.page
    : 1
);

const totalPages = computed(() => {
  return Math.ceil(totalItems.value / +limit.value);
});

const querySearch = ref(filterQuery?.query ?? '');
const inputSearchString = ref(filterQuery?.query ?? '');

const search = (text: string) => {
  querySearch.value = text;
}

const onSelectLimit = (value: string) => {
  limit.value = value;
}

const onChange = (n: number) => {
  page.value = n;
}

const handleSortChange = (newOrderBy: TAvailableSorting, newSortBy: string) => {
  orderBy.value = newOrderBy;
  sortBy.value = newSortBy;
}

const handleOpen = (id: number, routeName: AppRouteNames) => {
  router.push({ name: routeName, params: { id } });
}

const handleCreate = () => {
  router.push({ name: AppRouteNames.CLIENT_CREATE });
}

const handleEdit = (id: number, routeName: AppRouteNames) => {
  router.push({ name: routeName, params: { id } });
}

const handleDelete = async (id: number) => {
  await deleteItem(id);
  fetchAll();
}

const fetchRecords = async () => {
  const offset = (page.value - 1) * +limit.value;

  const query = {
    sortBy: sortBy.value,
    orderBy: orderBy.value,
    query: querySearch.value,
    limit: limit.value
  }
  const filterQueryParams = { ...query, page: page.value };
  const filterQuery = { ...query, offset };

  router.replace({ query: filterQueryParams });
  fetchAll(filterQuery);
}

watch(() => [orderBy.value, sortBy.value, limit.value, querySearch.value], () => {
  page.value = 1;
});

watchEffect(fetchRecords);
</script>

<style scoped lang="scss">
.wrapper {
  @apply max-w-[1000px] mx-auto mt-2 px-2.5 py-4;
}

.header-row {
  @apply flex justify-between items-center flex-wrap mt-3;
}

.title {
  @apply text-gray-700 text-2xl font-medium;
}

.table-container {
  @apply my-6 max-h-[450px] overflow-y-auto border border-gray-200;
}
</style>