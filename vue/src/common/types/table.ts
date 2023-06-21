import { AppRouteNames } from "@enums/route";
import { VueIcons } from "./icon";
import { ColorsEnum } from "@enums/colors";
import { OrderBy } from "@enums/order-by";

type ActionEmitType = "onOpen" | "onEdit" | "onDelete";

interface IAcitonEmiters {
  (e: ActionEmitType, id: number, routeName?: AppRouteNames): void;
}

interface IAction {
  title?: string;
  routeName?: AppRouteNames;
  iconName: VueIcons;
  emitName: ActionEmitType;
  actionKey: string;
  color: ColorsEnum;
}

type TypeColumn = '' | 'actions';

type TAvailableSorting = undefined | '' | OrderBy.ASC | OrderBy.DESC;

interface IColumn {
  type?: TypeColumn;
  title?: string;
  itemKey?: string;
}

type TableColumns = IColumn[];

export type {
  TAvailableSorting,
  ActionEmitType,
  IAcitonEmiters,
  IAction,
  TypeColumn,
  IColumn,
  TableColumns,
};
