import type { NavigationGuardNext, RouteLocationNormalized } from "vue-router";
import { AppLayoutsEnum, AppLayoutToFileMap } from "@enums/index";
import AppLayoutDefault from '@layouts/AppLayoutDefault.vue';

const loadLayoutMiddleware = async (route: RouteLocationNormalized, _, next: NavigationGuardNext): Promise<void> => {
  const { layout } = route.meta;
  const normalizedLayoutName = layout || AppLayoutsEnum.DEFAULT;
  const fileName = AppLayoutToFileMap[normalizedLayoutName];
  const fileNameWithoutExtension = fileName.split(".vue")[0];

  try {
    const component = await import(`../../components/layouts/${fileNameWithoutExtension}.vue`);
    route.meta.layoutComponent = component.default;
  } catch(_) {
    route.meta.layoutComponent = AppLayoutDefault;
  } finally {
    next();    
  }
}

export { loadLayoutMiddleware };