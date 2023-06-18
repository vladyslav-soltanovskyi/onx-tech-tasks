<template>
  <td class="table__body-cell">
    <slot></slot>
  </td>
</template>

<style scoped lang="scss">
.table__body-cell {
  @apply p-2 whitespace-nowrap text-left;
}
</style>