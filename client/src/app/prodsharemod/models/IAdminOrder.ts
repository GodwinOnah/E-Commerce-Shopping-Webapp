import { IDelivery } from "./IDelivery"
import { IItemOrdered } from "./IItemOrdered"
import { Address } from "./User"

export  interface IAdminOrder 
    {   id:number 
        adminOrderId:number  
        email : string
        shippingAddress : Address
        itemOrdered : IItemOrdered[] 
        orderStatus : string 
        orderDate : string 
        delivery : IDelivery
        confirmation : string  
}