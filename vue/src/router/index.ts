import { AppRoutes, AppRouteNames, AppLayoutsEnum } from "@/common/enums";
import { RouteRecordRaw, createRouter, createWebHistory } from "vue-router";
import { authGuardMiddleware, fetchAuthDataMiddleware, loadLayoutMiddleware } from "./middlewares";

const routes: RouteRecordRaw[] = [
  {
    path: AppRoutes.CLIENTS,
    name: AppRouteNames.CLIENTS,
    component: () => import('@pages/clients/Clients.vue'),
    meta: {
      isAuthRequired: true
    }
  },
  {
    path: AppRoutes.CLIENT,
    name: AppRouteNames.CLIENT,
    component: () => import('@pages/client/Client.vue'),
    meta: {
      isAuthRequired: true
    }
  },
  {
    path: AppRoutes.CREATE_CLIENT,
    name: AppRouteNames.CREATE_CLIENT,
    component: () => import('@pages/client-create/ClientCreate.vue'),
    meta: {
      isAuthRequired: true
    }
  },
  {
    path: AppRoutes.EDIT_CLIENT,
    name: AppRouteNames.EDIT_CLIENT,
    component: () => import('@pages/client-edit/ClientEdit.vue'),
    meta: {
      isAuthRequired: true
    }
  },
  {
    path: AppRoutes.SIGN_IN,
    name: AppRouteNames.SIGN_IN,
    component: () => import('@pages/sign-in/SignIn.vue'),
    meta: {
      isAuthRequired: false,
      layout: AppLayoutsEnum.AUTH
    }
  },
  {
    path: AppRoutes.SIGN_UP,
    name: AppRouteNames.SIGN_UP,
    component: () => import('@pages/sign-up/SignUp.vue'),
    meta: {
      isAuthRequired: false,
      layout: AppLayoutsEnum.AUTH
    }
  },
  {
    path: AppRoutes.NOT_FOUND,
    name: AppRouteNames.NOT_FOUND,
    component: () => import('@common/not-found/NotFound.vue'),
    meta: {
      isPublic: true,
      layout: AppLayoutsEnum.ERROR
    }
  },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

router.beforeEach(fetchAuthDataMiddleware);
router.beforeEach(authGuardMiddleware);
router.beforeEach(loadLayoutMiddleware);

export default router;
