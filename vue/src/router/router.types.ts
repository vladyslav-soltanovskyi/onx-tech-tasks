import { AppLayoutsEnum } from "@enums/layouts";
import type { VueElement } from "vue";

declare module "vue-router" {
  interface RouteMeta {
    layout?: AppLayoutsEnum;
    isAuthRequired?: boolean;
    isPublic?: boolean;
    layoutComponent?: VueElement;
  }
}