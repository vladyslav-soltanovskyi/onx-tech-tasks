import { TAvailableSorting } from './table';

interface FilterQuery<T extends Record<string, any> = {}> {
  sortBy?: keyof T | string;
  orderBy?: TAvailableSorting;
  query?: string;
  limit?: string;
  offset?: number;
}

interface FilterQueryParams<T extends Record<string, any> = {}> extends Omit<FilterQuery<T>, 'offest'> {
  page?: string;
}

export { FilterQuery, FilterQueryParams };