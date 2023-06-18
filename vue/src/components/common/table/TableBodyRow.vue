<template>
  <tr class="table__body-row">
    <template v-for="column in columns" :key="item[column.itemKey]">
      <TableBodyCell>
        <template v-if="column.type === 'actions'">
          <TableBodyActionCell
            :item="item"
            :actions="actions"
            @on-open="(id, routeName) => emit('onOpen', id, routeName)"
          />
        </template>

        <template v-else>
          {{ item[column.itemKey] }}
        </template>
      </TableBodyCell>
    </template>
  </tr>
</template>

<script setup lang="ts">
import { ActionEmitType, IAction, TableColumns } from "@types-app/index";
import TableBodyCell from "./TableBodyCell.vue";
import TableBodyActionCell from "./TableBodyActionCell.vue";
import { AppRouteNames } from "@enums/route";

interface ITableBodyRowProps {
  columns: TableColumns;
  actions?: IAction[];
  item: object;
}

const emit = defineEmits<{ (e: ActionEmitType, id: number, routeName?: AppRouteNames): void; }>();

defineProps<ITableBodyRowProps>();
</script>
