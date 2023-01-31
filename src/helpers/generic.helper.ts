export type PaginatedFilter<T = Record<string, never>> = T & {
  limit: number;
  page: number;
};
