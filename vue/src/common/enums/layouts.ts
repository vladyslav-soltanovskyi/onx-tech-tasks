enum AppLayoutsEnum {
  DEFAULT = "default",
  ERROR = "error",
  AUTH = "auth"
}

const AppLayoutToFileMap: Record<AppLayoutsEnum, string> = {
  [AppLayoutsEnum.DEFAULT]: "AppLayoutDefault.vue",
  [AppLayoutsEnum.ERROR]: "AppLayoutError.vue",
  [AppLayoutsEnum.AUTH]: "AppLayoutAuth.vue"
};

export { AppLayoutsEnum, AppLayoutToFileMap };