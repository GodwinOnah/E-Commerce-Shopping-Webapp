import { IItemOrdered } from "./IItemOrdered"
import { Address } from "./User"

export  interface IAdminOrder 
    {   id:number  
        Email : string
        shippingAddress :Address
        itemOrdered : IItemOrdered[] 
        orderStatus : string 
        orderDate : string  
        total : number 
  
}