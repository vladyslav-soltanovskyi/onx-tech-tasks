<template>
  <th class="table__head-cell">
    {{ title }}
  </th>
</template>

<script setup lang="ts">
interface ITableHeadCellProps {
  title?: string,
}

defineProps<ITableHeadCellProps>();
</script>

<style scoped lang="scss">
.table__head-cell {
  @apply p-2 whitespace-nowrap font-semibold text-left;
}
</style>