<template>
  <div class="flex h-12 items-center justify-between border-b border-neutral-300 sticky top-0 bg-white">
    <RouterLink :to="AppRoutes.CLIENTS" class="font-bold text-xl">
      Onx Tech Task
    </RouterLink>

    <template v-if="store.user">
      <button
        type="button"
        class="flex items-center py-1 px-2 border-none outline-none bg-transparent"
        @click="store.signOut"
      >
        Exit
        <span class="ml-2">
          <Icon name="faRightFromBracket" />
        </span>
      </button>
    </template>
  </div>
</template>

<script setup lang="ts">
import { AppRoutes } from '@enums/route';
import Icon from '@common/icon/Icon.vue'
import { useAuthStore } from '@/stores/auth';
const store = useAuthStore();
</script>