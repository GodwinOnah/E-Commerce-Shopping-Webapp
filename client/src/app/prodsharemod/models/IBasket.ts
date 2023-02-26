import { v4 as uuidv4 } from 'uuid';

export interface IBasket {
  id: string;
  items: IBasketItem[];
  clientSecrete?: string;
  paymentItentId?: string;
  deliveryId?: number;
}

export interface IBasketItem {
  productId: number
  prodName: string
  prodPrice: number
  quantity:number
  prodPicture: string
  productBrand: string
  productType: string
}

export class Basket implements IBasket {
   id= uuidv4();
    items=[];
}


export interface TotalBasketPrice {
       deliveryPrice: number
       subTotal: number
       total: number
     
      
    }


