<template>
  <table class="table">
      <thead class="table__head-row">
        <TableHeadRow :columns="columns" />
      </thead>
      <tbody class="table__body">
        <TransitionGroup name="slide">
          <template v-for="item in items" :key="item[idKey]">
            <TableBodyRow
              :columns="columns"
              :item="item"
              :actions="actions"
              @on-open="(id, routeName) => emit('onOpen', id, routeName)"
              @on-edit="(id, routeName) => emit('onEdit', id, routeName)"
              @on-delete="(id) => emit('onDelete', id)"
            />
          </template>
        </TransitionGroup>
      </tbody>
  </table>
</template>

<script setup lang="ts">
import TableHeadRow from "./TableHeadRow.vue";
import TableBodyRow from "./TableBodyRow.vue";
import { IAction, TableColumns, ActionEmitType } from "@types-app/index";
import { AppRouteNames } from "@enums/route";

interface ITableProps {
  idKey: string;
  columns: TableColumns;
  items: object[];
  actions?: IAction[];
}

const { actions = [] } = defineProps<ITableProps>();


const emit = defineEmits<{ (e: ActionEmitType, id: number, routeName?: AppRouteNames): void; }>();
</script>

<style scoped lang="scss">
.slide-move {
  transition: transform 1s ease;
}

.table {
  @apply table-auto w-full block overflow-x-auto;

  &__head-row {
    @apply text-xs font-semibold uppercase text-gray-500 bg-gray-100;
  }

  &__body {
    @apply text-sm divide-y divide-gray-100;
  }
}
</style>
