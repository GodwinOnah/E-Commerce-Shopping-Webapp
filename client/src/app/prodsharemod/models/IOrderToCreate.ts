import { ShippingAddress } from "@stripe/stripe-js"
import { Address } from "./User"

export  interface IOrderToCreate{
    basketId: string
    deliveryId: number
    shippingAddress:ShippingAddress
}