<template>
  <div class="max-w-[1000px] mx-auto px-2 py-4">
    <template v-if="isLoading">
      <Spinner />
    </template>
    
    <template v-else-if="!!item">
      <Back />
      <ClientContent :client="item" />
    </template>

    <template v-else>
      <Back />
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
import Back from '@common/back/Back.vue';
import NotFound from '@common/not-found/NotFound.vue';
import ClientContent from './components/ClientContent.vue';

const route = useRoute()
const { item, isLoading, fetchOne } = useCrud<{}, IClientDetalis>(config);

onMounted(() => {
  fetchOne(+route.params.id);
});
</script>