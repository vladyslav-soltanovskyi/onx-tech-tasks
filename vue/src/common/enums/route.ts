enum AppRoutes {
  CLIENTS = '/',
  CLIENT = '/clients/:id',
  CLIENT_EDIT = '/clients/:id/form',
  CLIENT_CREATE = '/clients/form',
  NOT_FOUND = "/:pathMatch(.*)*"
}

enum AppRouteNames {
  CLIENTS = 'Clients',
  CLIENT = 'Client',
  CLIENT_EDIT = 'Client_Edit',
  CLIENT_CREATE = 'Client_Create',
  NOT_FOUND = "NotFound"
}

export { AppRoutes, AppRouteNames };