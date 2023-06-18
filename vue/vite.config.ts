import { defineConfig } from 'vite';
import vue from '@vitejs/plugin-vue';
import { fileURLToPath, URL } from "url";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [vue()],
  resolve: {
    alias: [
      {
        find: '@enums',
        replacement: fileURLToPath(new URL('./src/common/enums', import.meta.url))
      },
      {
        find: '@types-app',
        replacement: fileURLToPath(new URL('./src/common/types', import.meta.url))
      },
      {
        find: '@common',
        replacement: fileURLToPath(new URL('./src/components/common', import.meta.url))
      },
      {
        find: '@pages',
        replacement: fileURLToPath(new URL('./src/components/pages', import.meta.url))
      },
      {
        find: '@views',
        replacement: fileURLToPath(new URL('./src/views', import.meta.url))
      },
      {
        find: '@services',
        replacement: fileURLToPath(new URL('./src/services', import.meta.url))
      },
      {
        find: '@helpers',
        replacement: fileURLToPath(new URL('./src/helpers', import.meta.url))
      },
      {
        find: '@hooks',
        replacement: fileURLToPath(new URL('./src/hooks', import.meta.url))
      },
      {
        find: '@plugins',
        replacement: fileURLToPath(new URL('./src/plugins', import.meta.url))
      },
      {
        find: '@',
        replacement: fileURLToPath(new URL('./src', import.meta.url))
      },
    ]
  }
});