<template>
  <template v-if="type === 'actions'">
    <th class="table__head-cell" :class="type">
      {{ title }}
    </th>
  </template>
  <template v-else>
    <th class="table__head-cell" @click="handleClick">
      {{ title }}
      <template v-if="sortBy === itemKey">
        <template v-if="orderBy === OrderBy.DESC">
          <Icon name="faChevronUp" />
        </template>
        <template v-else-if="orderBy === OrderBy.ASC">
          <Icon name="faChevronDown" />
        </template>
      </template>
    </th>
  </template>
</template>

<script setup lang="ts">
import { OrderBy } from '@enums/order-by';
import { TAvailableSorting, TypeColumn } from '@types-app/table';
import Icon from '@common/icon/Icon.vue';

interface ITableHeadCellProps {
  type?: TypeColumn;
  title?: string;
  itemKey?: string;
  sortBy?: string;
  orderBy?: TAvailableSorting;
}

const props = defineProps<ITableHeadCellProps>();

const availableSortings: Array<TAvailableSorting> = [undefined, OrderBy.ASC, OrderBy.DESC];

const emit = defineEmits<{
  (e: 'sort-change', orderBy: TAvailableSorting, sortBy: string): void;
}>()

const nextSort = () => {
  let currentIndex = availableSortings.indexOf(props.orderBy);
  if (currentIndex === -1) currentIndex = 0;
  currentIndex++;
  if (currentIndex > 2) currentIndex = 0;
  return availableSortings[currentIndex];
}

const handleClick = () => {
  if (props.itemKey === props.sortBy) {
    return emit('sort-change', nextSort(), props.itemKey);
  }
  emit('sort-change', OrderBy.ASC, props.itemKey);
}
</script>

<style scoped lang="scss">
.table__head-cell {
  @apply p-2 whitespace-nowrap font-semibold text-left;

  &:not(.actions) {
    @apply cursor-pointer;
  }
}
</style>