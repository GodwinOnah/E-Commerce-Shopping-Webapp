import { v4 as uuidv4 } from 'uuid';

export interface IBasket {
 
  id: string;
  items: IBasketItem[];
}

export interface IBasketItem {
  itemId: number
  itemName: string
  itemPrice: number
  itemQuantity:number
  itemPicture: string
  itemBrand: string
  itemType: string
}

export class Basket implements IBasket {
   id= uuidv4();
  //  id= '3';
    items=[];


}
