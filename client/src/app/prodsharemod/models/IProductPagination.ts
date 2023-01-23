
import {IProduct}  from './IProduct';

export interface IProductPagination {
    pageIndex: number
    pageSize: number
    count: number
    data: IProduct[]
  }
