import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import { icons } from './plugins/icons';
import CIcon from '@coreui/icons-vue';
import 'vue-toast-notification/dist/theme-sugar.css';
import './style.scss'

createApp(App)
  .use(router)
  .provide('icons', icons)
  .component('CIcon', CIcon)
  .mount('#app')
