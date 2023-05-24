import {IDelivery}  from './IDelivery';
import {IItemOrdered}  from './IItemOrdered';
import { IShippingAddress } from './IShippingAddress';
// import { IOrderAddress } from './IOrderAddress';
import { Address } from './User';


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
  
}