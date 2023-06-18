<template>
  <div class="p-2">

    <h2 class="font-bold text-xl">Client Details</h2>
    <ClientDetails v-bind="client" :employee="client.employee" />

    <h2 class="font-bold text-xl my-3">Last Orders</h2>
    
    <template v-if="!!client.orders.length">
      <template v-for="order in client.orders" :key="order.id">
        <Order v-bind="order" />
      </template>
    </template>
    <template v-else>
      <p>Empty Order List</p>
    </template>

    <h2 class="font-bold text-xl my-3">Cars</h2>
    
    <template v-if="!!client.cars.length">
      <template v-for="car in client.cars" :key="car.id">
        <Car v-bind="car" />
      </template>
    </template>
    <template v-else>
      <p>Empty Car List</p>
    </template>
  </div>
</template>

<script setup lang="ts">
import { IClientDetalis } from '@types-app/client';
import Order from './Order.vue';
import ClientDetails from './ClientDetails.vue';
import Car from './Car.vue';

interface IClientContentProps {
  client: IClientDetalis;
}

defineProps<IClientContentProps>();
</script>

<style scoped lang="scss">
.property {
  @apply font-bold;
}
</style>