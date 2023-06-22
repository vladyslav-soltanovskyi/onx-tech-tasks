import type { NavigationGuardNext, RouteLocationNormalized } from "vue-router";
import { useAuthStore } from "@/stores/auth";
import { AppRouteNames } from "@enums/route";

export const authGuardMiddleware = (to: RouteLocationNormalized, _, next: NavigationGuardNext) => {
  const { isAuthRequired, isPublic } = to.meta;
  const { user } = useAuthStore();

  if (isPublic) {
    return next();
  }

  if (isAuthRequired && !user) {
    return next({ name: AppRouteNames.SIGN_IN });
  }

  if (!isAuthRequired && user) {
    return next({ name: AppRouteNames.CLIENTS });
  }

  return next();
}