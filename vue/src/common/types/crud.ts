interface ICrudOptions {
  name: string;
  url: string;
}

interface TypeAllItemsDto<T> {
  data: T[];
  total_items: number;
}

export type { ICrudOptions, TypeAllItemsDto };