export interface IProductPagination<T> {
    pageIndex: number
    pageSize: number
    count: number
    data: T;
  }
