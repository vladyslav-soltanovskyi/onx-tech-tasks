<template>
  <div class="pagination">
    <div class="pagination__column">

      <template v-if="totalRecords">
        <div class="pagination__text pagination__text_range">
          {{ fromRecords }} — {{ toRecords }}
        </div>
      </template>

      <template v-if="totalRecords">
        <div class="pagination__text">
          of {{ totalRecords }}
        </div>
      </template>

    </div>
    <div class="pagination__column">
      <template v-if="totalPages">
        <div class="pagination__text">page</div>
      </template>

      <template v-if="totalPages">
        <div class="pagination__controls">
          <Counter
            :current="page"
            :max="totalPages"
            @on-change="onChange"
          />
        </div>
      </template>

      <template v-if="totalPages">
        <div class="pagination__text">
          of {{ totalPages }}
        </div>
      </template>
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed } from "vue";
import Counter from '@common/counter/Counter.vue';

interface IPaginationProps {
  page: number,
  totalPages?: number,
  pageLimit?: string,
  totalRecords?: number
}

const props = defineProps<IPaginationProps>()

const emit = defineEmits<{
  (e: 'update:modelValue', value: number): void,
  (e: 'on-change', n: number): void
}>();

const onChange = (n: number) => emit('on-change', n);

const fromRecords = computed(() => {
  return (props.page - 1) * +props.pageLimit + 1;
});

const toRecords = computed(() => {
  const n =  props.page * +props.pageLimit;
  return n > props.totalRecords ? props.totalRecords : n;
});
</script>

<style scoped lang="scss">
.pagination {
  @apply flex justify-between items-center flex-wrap;

  &__column {
    @apply flex items-center;
  }

  &__text {
    @apply mx-1;
  }

  &__controls {
    @apply mx-2;
  }
}
</style>