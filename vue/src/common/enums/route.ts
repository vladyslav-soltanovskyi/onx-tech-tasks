enum AppRoutes {
  CLIENTS = '/',
  CLIENT = '/clients/:id',
  NOT_FOUND = "/:pathMatch(.*)*"
}

enum AppRouteNames {
  CLIENTS = 'Clients',
  CLIENT = 'Client',
  NOT_FOUND = "NotFound"
}

export { AppRoutes, AppRouteNames };