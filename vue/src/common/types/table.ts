import { AppRouteNames } from "@enums/route";
import { VueIcons } from "./icon";

type ActionEmitType = "onOpen";

interface IAcitonEmiters {
  (e: ActionEmitType, id: number, routeName?: AppRouteNames): void;
}

interface IAction {
  title?: string;
  routeName?: AppRouteNames;
  iconName: VueIcons;
  emitName: ActionEmitType;
  actionKey: string;
}

type TypeColumn = '' | 'actions';

interface IColumn {
  type?: TypeColumn;
  title?: string;
  itemKey?: string;
}

type TableColumns = IColumn[];

export type {
  ActionEmitType,
  IAcitonEmiters,
  IAction,
  TypeColumn,
  IColumn,
  TableColumns,
};
