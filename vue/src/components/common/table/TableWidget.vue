<template>
  <div class="header-row">
    <h3 class="title">{{ title }}</h3>
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
        :id-key="idKey"
        :items="items"
        :columns="columns"
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
    <p>Empty {{ title }} list</p>
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
</template>

<script setup lang="ts">
import {
  TAvailableSorting,
  FilterQueryParams,
  ActionEmitType,
  ITable,
  FilterQuery
} from '@types-app/index';
import { computed, onMounted, ref, watch } from 'vue';
import { limitOptions } from './data';
import { useRouter, useRoute } from 'vue-router'
import { AppRouteNames } from '@enums/route';
import Table from '@common/table/Table.vue';
import Spinner from '@common/spinner/Spinner.vue';
import Button from '@common/button/Button.vue';
import Pagination from '@common/pagination/Pagination.vue';
import Search from '@common/search/Search.vue';
import Select from '@common/form-elements/select/Select.vue';
import { useDebounce } from '@hooks/useDebounce';

interface ITableWidgetProps extends ITable {
  title: string;
  totalItems: number;
  isLoading?: boolean;
  isSending?: boolean;
  fetchRecords?: (filterQuery?: FilterQuery) => Promise<void>;
  deleteRecord?: (id: number) => Promise<void>;
}

const router = useRouter();
const route = useRoute();

const props = defineProps<ITableWidgetProps>();

const emit = defineEmits<{
  (e: ActionEmitType, id: number, routeName?: AppRouteNames): void,
  (e: 'on-create'): void;
}>();

const isLoading = computed(() => !!props.isLoading);
const isSending = computed(() => !!props.isSending);

const filterQuery: FilterQueryParams = route.query;

const sortBy = ref<string>(filterQuery?.sortBy ?? '');
const orderBy = ref<TAvailableSorting>(filterQuery?.orderBy ?? '');
const limit = ref(filterQuery?.limit ?? limitOptions[0].value);
const page = ref<number>(
  Number.isInteger(+filterQuery?.page)
    ? +filterQuery?.page
    : 1
);

const totalPages = computed(() => {
  return Math.ceil(props.totalItems / +limit.value);
});

const querySearch = ref(filterQuery?.query ?? '');
const inputSearchString = ref(filterQuery?.query ?? '');

const search = (text: string) => {
  querySearch.value = text;
  page.value = 1;
}

const onSelectLimit = (value: string) => {
  limit.value = value;
  page.value = 1;
}

const onChange = (n: number) => {
  page.value = n;
}

const handleSortChange = (newOrderBy: TAvailableSorting, newSortBy: string) => {
  orderBy.value = newOrderBy;
  sortBy.value = newSortBy;
  page.value = 1;
}

const handleOpen = (id: number, routeName: AppRouteNames) => {
  emit('onOpen', id, routeName);
}

const handleCreate = () => {
  emit('on-create');
}

const handleEdit = (id: number, routeName: AppRouteNames) => {
  emit('onEdit', id, routeName);
}

const handleDelete = async (id: number) => {
  props?.deleteRecord(id)
    .then(() => fetchRecords());
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
  props?.fetchRecords(filterQuery);
}
const lazyFetch = useDebounce(fetchRecords, 300);

onMounted(fetchRecords);
watch(() => [orderBy.value, sortBy.value, limit.value, querySearch.value, page.value], lazyFetch);
</script>

<style scoped lang="scss">
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