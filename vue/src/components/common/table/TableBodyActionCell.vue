<template>
  <th class="table__body-action-cell">
    <template v-for="(action, indx) in actions" :key="indx">
      <span
        class="icon-cell"
        :style="getStylesIcon(action.color)"
        @click="emit(action.emitName, item[action.actionKey], action.routeName)"
      >
        <Icon :name="action.iconName" />
      </span>
    </template>
  </th>
</template>

<script setup lang="ts">
import Icon from '@common/icon/Icon.vue';
import { IAcitonEmiters, IAction } from '@types-app/table';

interface ITableHeadCellProps {
  actions: IAction[];
  item: object;
}

const emit = defineEmits<IAcitonEmiters>();

const getStylesIcon = (color: string) => {
  return {
    color,
    borderColor: color
  };
}

defineProps<ITableHeadCellProps>();
</script>

<style scoped lang="scss">
.table__body-action-cell {
  @apply flex justify-between items-center;
}
.icon-cell {
  @apply w-8 h-8 flex items-center justify-center border rounded-full p-1.5 cursor-pointer;

  &:not(&:first-child) {
    @apply ml-2;
  }
}
</style>