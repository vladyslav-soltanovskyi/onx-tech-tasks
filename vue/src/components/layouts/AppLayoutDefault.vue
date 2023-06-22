<template>
  <div class="wrapper">
    <Navbar />
    <slot />
  </div>
</template>

<script setup lang="ts">
import Navbar from '@common/navbar/Navbar.vue';
</script>