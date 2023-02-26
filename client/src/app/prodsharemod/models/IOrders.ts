import {IDelivery}  from './IDelivery';
import {IOrderAddress}  from './IOrderAddress';
import {IItemOrdered}  from './IItemOrdered';
import {IOrderStatus}  from './IOrderStatus';


export  interface IOrders 
    {   id:number  
        Email : string
        delivery : IDelivery[] 
        address :IOrderAddress[]
        itemOrdered : IItemOrdered[] 
        orderStatus : IOrderStatus[] 
        oderDate : string  
        subTotal : number
        total : number 
        paymentIntentId : string   
  
}