<template>
  <th class="table__body-action-cell">
    <template v-for="(action, indx) in actions" :key="indx">
      <span
        class="icon-cell"
        @click="emit(action.emitName, item[action.actionKey], action.routeName)"
      >
        <CIcon
          :name="action.iconName"
          size="sm"
          :title="action.title"
        />
      </span>
    </template>
  </th>
</template>

<script setup lang="ts">
import { IAcitonEmiters, IAction } from '@types-app/table';

interface ITableHeadCellProps {
  actions: IAction[];
  item: object;
}

const emit = defineEmits<IAcitonEmiters>();

defineProps<ITableHeadCellProps>();
</script>

<style scoped lang="scss">
.table__body-action-cell {
  @apply flex justify-between items-center;
}
.icon-cell {
  @apply w-8 h-8 text-green-400 border-green-400 border rounded-full p-1.5 hover:text-green-600 hover:border-green-600 cursor-pointer;
}
</style>