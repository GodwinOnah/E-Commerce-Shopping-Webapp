import {IDelivery}  from './IDelivery';
import {IItemOrdered}  from './IItemOrdered';
import { Address } from './User';


export  interface IOrders 
    {   id:number  
        Email : string
        delivery : string 
        shippingAddress :Address
        itemOrdered : IItemOrdered[] 
        orderStatus : string 
        oderDate : string  
        subTotal : number
        total : number 
        paymentIntentId : string   
  
}