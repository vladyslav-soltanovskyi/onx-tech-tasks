<template>
  <h2>{{ name }} Not Found</h2>
</template>

<script setup lang="ts">
const { name = "Page" } = defineProps<{ name?: string }>();
</script>