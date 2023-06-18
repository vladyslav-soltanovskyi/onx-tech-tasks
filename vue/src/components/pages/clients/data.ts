import { ApiRoutes, AppRouteNames } from "@enums/index";
import { ICrudOptions } from "@types-app/crud";
import { IAction, TableColumns } from "@types-app/table";

const config: ICrudOptions = {
  name: AppRouteNames.CLIENTS,
  url: ApiRoutes.CLIENTS,
};

const actions: IAction[] = [
  {
    title: 'Open',
    emitName: 'onOpen',
    actionKey: 'id',
    iconName: 'cilRoom',
    routeName: AppRouteNames.CLIENT
  }
];

const columns: TableColumns = [
  {
    title: "Id",
    itemKey: "id",
  },
  {
    title: "Name",
    itemKey: "name",
  },
  {
    title: "Surname",
    itemKey: "surname",
  },
  {
    title: "Address",
    itemKey: "address",
  },
  {
    title: "Email",
    itemKey: "email",
  },
  {
    title: "Actions",
    type: 'actions'
  }
];

export { config, columns, actions };