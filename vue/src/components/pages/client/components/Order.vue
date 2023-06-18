<template>
  <div class="order__container">
    <div class="ordered-product__container">
      <template v-for="product in ordered_products" :key="product.id">
        <div class="ordered-product">
          <p class="ordered-product-title">
            {{ product.product.title }}
          </p>
          <p class="ordered-product-description">
            {{ product.product.description }}
          </p>
          <p class="ordered-product-price-and-qty">
            <span>${{ product.product.price }} - {{ product.qty }} qty.</span>
          </p>
        </div>
      </template>
    </div>
    
    <div class="order-date">Date of order: {{ dateFormatter(created_at) }}</div>
    <div class="order-total-price">Total price: ${{ totalPrice }}</div>
  </div>
</template>

<script setup lang="ts">
import { dateFormatter } from '@helpers/date-formatter';
import { IOrder } from '@types-app/index';
import { computed } from 'vue';

const props = defineProps<IOrder>();

const totalPrice = computed(() => {
  return props.ordered_products.reduce((total, item) => {
    return total + (item.qty * item.product.price);
  }, 0);
})
</script>

<style scoped lang="scss">

.order {
  &-date {
    @apply text-gray-800 text-sm font-bold mt-2;
  }
  
  &-total-price {
    @apply text-gray-800 text-sm font-bold mt-2;
  }

  &__container {
    @apply border-y py-2 border-neutral-300;
  }
}

.ordered-product {
  @apply bg-neutral-200 rounded-xl border-neutral-100 border p-3 mt-2;


  &-title {
    @apply text-gray-800  font-medium;
  }

  &-description {
    @apply text-gray-600 text-sm leading-5 mt-1 line-clamp-2;
  }

  &-price-and-qty {
    @apply text-sm text-gray-800 font-bold mt-2;
  }
}
</style>