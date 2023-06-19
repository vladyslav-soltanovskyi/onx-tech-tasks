import { AppRoutes, AppRouteNames } from "@/common/enums";
import { createRouter, createWebHistory } from "vue-router";

const routes = [
  {
    path: AppRoutes.CLIENTS,
    name: AppRouteNames.CLIENTS,
    component: () => import('@pages/clients/Clients.vue'),
  },
  {
    path: AppRoutes.CLIENT,
    name: AppRouteNames.CLIENT,
    component: () => import('@pages/client/Client.vue'),
  },
  {
    path: AppRoutes.CLIENT_CREATE,
    name: AppRouteNames.CLIENT_CREATE,
    component: () => import('@pages/client-create/ClientCreate.vue'),
  },
  {
    path: AppRoutes.CLIENT_EDIT,
    name: AppRouteNames.CLIENT_EDIT,
    component: () => import('@pages/client-edit/ClientEdit.vue'),
  },
  {
    path: AppRoutes.NOT_FOUND,
    name: AppRouteNames.NOT_FOUND,
    component: () => import('@common/not-found/NotFound.vue'),
  },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;
