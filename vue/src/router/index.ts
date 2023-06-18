import { AppRoutes, AppRouteNames } from "@/common/enums";
import { createRouter, createWebHistory } from "vue-router";
import Clients from '@pages/clients/Clients.vue';
import Client from '@pages/client/Client.vue';
import NotFound from '@common/not-found/NotFound.vue';

const routes = [
  {
    path: AppRoutes.CLIENTS,
    name: AppRouteNames.CLIENTS,
    component: Clients,
  },
  {
    path: AppRoutes.CLIENT,
    name: AppRouteNames.CLIENT,
    component: Client,
  },
  {
    path: AppRoutes.NOT_FOUND,
    name: AppRouteNames.NOT_FOUND,
    component: NotFound,
  },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;
