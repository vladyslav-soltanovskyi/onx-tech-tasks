<template>
  <v-icon :icon="fasIcons[name]" :size="size" />
</template>

<script setup lang="ts">
import { VueIcons } from '@types-app/index'
import * as fasIcons from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIconProps } from '@fortawesome/vue-fontawesome';

interface IconProps {
  name: VueIcons;
  size?: FontAwesomeIconProps['size'];
}

defineProps<IconProps>();
</script>