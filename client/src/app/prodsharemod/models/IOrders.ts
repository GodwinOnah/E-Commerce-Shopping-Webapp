import {IDelivery}  from './IDelivery';
import {IItemOrdered}  from './IItemOrdered';
import { IOrderAddress } from './IOrderAddress';
import { Address } from './User';


export  interface IOrders 
    {   id:number  
        Email : string
        delivery : string 
        shippingAddress :IOrderAddress
        itemOrdered : IItemOrdered[] 
        orderStatus : string 
        oderDate : string  
        subTotal : number
        total : number 
        paymentIntentId : string   
  
}