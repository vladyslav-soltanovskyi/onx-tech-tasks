<template>
  <tr>
    <template v-for="column in columns">
      <TableHeadCell
        v-bind="column"
        :order-by="orderBy"
        :sort-by="sortBy"
        @sort-change="handleSortChange"
      />
    </template>
  </tr>
</template>

<script setup lang="ts">
import { TAvailableSorting, TableColumns } from '@types-app/index';
import TableHeadCell from "./TableHeadCell.vue";

interface ITableHeadRowProps {
  columns: TableColumns;
  sortBy?: string;
  orderBy?: TAvailableSorting;
}

defineProps<ITableHeadRowProps>();

const emit = defineEmits<{
  (e: 'sort-change', orderBy: TAvailableSorting, sortBy: string): void;
}>();

const handleSortChange = (orderBy: TAvailableSorting, sortBy: string) => {
  emit('sort-change', orderBy, sortBy);
}
</script>
