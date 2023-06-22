import { VueIcons } from "./icon";
import { ColorsEnum } from "@enums/colors";
import { OrderBy } from "@enums/order-by";

type ActionEmitType = "onOpen" | "onEdit" | "onDelete";

interface IAcitonEmiters {
  (e: ActionEmitType, id: number, routeName?: string): void;
}

interface IAction {
  title?: string;
  routeName?: string;
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

interface ITable {
  idKey: string;
  columns: TableColumns;
  items: object[];
  actions?: IAction[];
  sortBy?: string;
  orderBy?: TAvailableSorting;
}

export type {
  TAvailableSorting,
  ActionEmitType,
  IAcitonEmiters,
  IAction,
  TypeColumn,
  IColumn,
  TableColumns,
  ITable
};
