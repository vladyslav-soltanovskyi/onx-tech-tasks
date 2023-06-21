import { ApiRoutes, AppRouteNames, ColorsEnum } from "@enums/index";
import { ICrudOptions } from "@types-app/crud";
import { IOption } from "@types-app/form";
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
    routeName: AppRouteNames.CLIENT_EDIT
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

const limitOptions: IOption[] = [
  {
    value: '5',
    text: '5',
  },
  {
    value: '10',
    text: '10',
  },
  {
    value: '20',
    text: '20',
  },
  {
    value: '50',
    text: '50',
  },
  {
    value: '100',
    text: '100',
  },
  {
    value: '200',
    text: '200',
  },
  {
    value: '500',
    text: '500',
  },
  {
    value: '1000',
    text: '1000',
  }
]

export { config, columns, actions, limitOptions };