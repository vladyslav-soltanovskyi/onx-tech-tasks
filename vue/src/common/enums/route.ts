enum AppRoutes {
  CLIENTS = '/',
  SIGN_IN = '/sign-in',
  SIGN_UP = '/sign-up',
  CLIENT = '/clients/:id',
  EDIT_CLIENT = '/clients/:id/form',
  CREATE_CLIENT = '/clients/form',
  NOT_FOUND = "/:pathMatch(.*)*"
}

enum AppRouteNames {
  CLIENTS = 'Clients',
  CLIENT = 'Client',
  SIGN_IN = 'sign-in',
  SIGN_UP = 'sign-up',
  EDIT_CLIENT = 'Edit_Client',
  CREATE_CLIENT = 'Create_Client',
  NOT_FOUND = "NotFound"
}

export { AppRoutes, AppRouteNames };