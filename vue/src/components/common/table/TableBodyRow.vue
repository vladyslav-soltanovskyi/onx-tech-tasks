<template>
  <tr class="table__body-row">
    <template v-for="column in columns" :key="item[column.itemKey]">
      <TableBodyCell>
        <template v-if="column.type === 'actions'">
          <TableBodyActionCell
            :item="item"
            :actions="actions"
            @on-open="(id, routeName) => emit('onOpen', id, routeName)"
            @on-edit="(id, routeName) => emit('onEdit', id, routeName)"
            @on-delete="(id) => emit('onDelete', id)"
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

interface ITableBodyRowProps {
  columns: TableColumns;
  actions?: IAction[];
  item: object;
}

const emit = defineEmits<{ (e: ActionEmitType, id: number, routeName?: string): void; }>();

defineProps<ITableBodyRowProps>();
</script>
