<template>
  <div>
    <template v-if="isLoading">
      <Spinner />
    </template>

    <template v-else-if="!!item">
      <ClientContent :client="item" />
    </template>

    <template v-else>
      <NotFound name="Client" />
    </template>
  </div>
</template>

<script setup lang="ts">
import { useCrud } from '@hooks/useCrud';
import { IClientDetalis } from '@types-app/index';
import { config } from './data';
import { onMounted } from 'vue';
import { useRoute } from 'vue-router';
import Spinner from '@common/spinner/Spinner.vue';
import NotFound from '@common/not-found/NotFound.vue';
import ClientContent from './components/ClientContent.vue';

const route = useRoute()
const { item, isLoading, fetchOne } = useCrud<{}, IClientDetalis>(config);

onMounted(() => {
  fetchOne(+route.params.id);
});
</script>