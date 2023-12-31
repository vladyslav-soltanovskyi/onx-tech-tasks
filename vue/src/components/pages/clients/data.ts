import { ApiRoutes, AppRouteNames, ColorsEnum } from "@enums/index";
import { ICrudOptions, IAction, TableColumns } from "@types-app/index";

const config: ICrudOptions = {
  name: AppRouteNames.CLIENTS,
  url: ApiRoutes.CLIENTS,
};

const actions: IAction[] = [
  {
    title: 'Open',
    emitName: 'onOpen',
    actionKey: 'id',
    iconName: 'faEye',
    color: ColorsEnum.GREEN,
    routeName: AppRouteNames.CLIENT
  },
  {
    title: 'Edit',
    emitName: 'onEdit',
    actionKey: 'id',
    iconName: 'faPen',
    color: ColorsEnum.YELLOW,
    routeName: AppRouteNames.EDIT_CLIENT
  },
  {
    title: 'Delete',
    emitName: 'onDelete',
    actionKey: 'id',
    iconName: 'faTrash',
    color: ColorsEnum.RED
  },
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