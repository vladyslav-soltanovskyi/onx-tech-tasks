import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import FontAwesomeIcon from '@plugins/icons';
import 'vue-toast-notification/dist/theme-sugar.css';
import './style.scss'

createApp(App)
  .use(router)
  .component('v-icon', FontAwesomeIcon)
  .mount('#app')
