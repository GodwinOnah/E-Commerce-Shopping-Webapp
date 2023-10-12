import {IItemOrdered}  from './IItemOrdered';
import { IShippingAddress } from './IShippingAddress';

export  interface IOrders 
    {   id:number  
        Email : string
        delivery : string 
        shippingAddress :IShippingAddress
        itemOrdered : IItemOrdered[] 
        orderStatus : string 
        orderDate : string  
        subTotal : number
        total : number 
        paymentIntentId : string 
        confirmation : string  
  
}