import { Address } from "./User"

export  interface IOrderToCreate{
    basketId: string
    deliveryId: number
    shippingAddress:Address
}