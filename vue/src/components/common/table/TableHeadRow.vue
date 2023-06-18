<template>
  <tr>
    <template v-for="column in columns">
      <TableHeadCell v-bind="column" />
    </template>
  </tr>
</template>

<script setup lang="ts">
import { TableColumns } from '@types-app/index';
import TableHeadCell from "./TableHeadCell.vue";

interface ITableHeadRowProps {
  columns: TableColumns,
}

defineProps<ITableHeadRowProps>();
</script>
