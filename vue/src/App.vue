<template>
  <AppLayout>
    <RouterView />
  </AppLayout>
  <template v-if="store.isSending">
    <Spinner />
  </template>
</template>

<script setup lang="ts">
import AppLayout from '@layouts/AppLayout.vue';
import Spinner from '@common/spinner/Spinner.vue';
import { useAuthStore } from './stores/auth';
const store = useAuthStore();
</script>