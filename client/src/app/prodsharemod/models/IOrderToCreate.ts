import { ShippingAddress } from "@stripe/stripe-js"

export  interface IOrderToCreate{
    basketId: string
    deliveryId: number
    shippingAddress:ShippingAddress
}