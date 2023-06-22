<template>
  <div class="mt-3 bg-neutral-200 p-3 rounded-lg">
    <p>
      <span class="property">Client name:</span> {{ name }} {{ surname }}
    </p>
    <p class="mt-2">
      <span class="property">Email:</span> {{ email }}
    </p>
    <p class="mt-2">
      <span class="property">Address:</span> {{ address }}
    </p>
    <p class="mt-2">
      <span class="property">Date of registration:</span> {{ dateFormatter(created_at) }}
    </p>
    <p class="mt-2">
      <span class="property">Employee name:</span> {{ employee['name'] }} {{ employee['surname'] }}
    </p>
  </div>
</template>

<script setup lang="ts">
import { IClient, IEmployee } from '@types-app/index';
import { dateFormatter } from '@helpers/date-formatter';

interface IClientDetalisProps extends IClient {
  employee: IEmployee;
}

defineProps<IClientDetalisProps>();
</script>

<style scoped lang="scss">
.property {
  @apply font-bold;
}
</style>