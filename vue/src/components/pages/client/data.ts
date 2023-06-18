import { ApiRoutes, AppRouteNames } from "@enums/index";
import { ICrudOptions } from "@types-app/crud";

const config: ICrudOptions = {
  name: AppRouteNames.CLIENTS,
  url: ApiRoutes.CLIENTS,
};

export { config };