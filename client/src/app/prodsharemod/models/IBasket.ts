import { v4 as uuidv4 } from 'uuid';
import { IDelivery } from './IDelivery';
import { Address } from './User';

export interface IBasket {
  id: string;
  items: IBasketItem[];
  clientSecret?: string;
  paymentItentId?: string;
  deliveryId?: number;
  deliveryPrice?:number;
  deliveryName?:string;
  deliveryTime?:string;
  deliveryDescription?:string;
}

export interface IBasketItem {
  id: number;
  prodName: string;
  prodPrice: number;
  quantity:number;
  prodPicture: string;
  productBrand: string;
  productType: string;
}

export class Basket implements IBasket {
  id = uuidv4();
  items = [];
  deliveryPrice: number=2.5;
  deliveryName: string= "";
  deliveryTime: string= "";
  deliveryDescription: string= "";

}


export interface TotalBasketPrice {
       shippingPrice: number;
       subTotal: number;
       total: number;
     
      
    }


