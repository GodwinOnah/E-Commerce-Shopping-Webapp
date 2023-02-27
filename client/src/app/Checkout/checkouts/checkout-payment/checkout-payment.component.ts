import { Component, Input } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { BasketService } from 'src/app/basket/basket.service';
import { IBasket } from 'src/app/prodsharemod/models/IBasket';
import { Address } from 'src/app/prodsharemod/models/User';
import { CheckoutServiceService } from '../../checkout-service.service';

@Component({
  selector: 'app-checkout-payment',
  templateUrl: './checkout-payment.component.html',
  styleUrls: ['./checkout-payment.component.scss']
})
export class CheckoutPaymentComponent {

  @Input() checkOutForm? : FormGroup;

    constructor(private basketService:BasketService,
    private checkOutService:CheckoutServiceService){

  }

  OrderSubmission(){
    const basket = this.basketService.CurrentBasket();
    if(!basket)return;
    const orderToCreate = this.GetOrderDetails(basket);
    if(!orderToCreate)return;
    this.checkOutService.CreateAnOrder(orderToCreate).subscribe({
      next: order=>{   
        console.log(order);
      }
    })
  }
  private GetOrderDetails(basket: IBasket) {
    const deliveryId = this.checkOutForm?.get('deliveryForm')?.get('delivery')?.value;
    const shippingAddress = this.checkOutForm?.get('addressForm')?.value as Address;
    if(!deliveryId && !shippingAddress)return;
    return{
      basketId:basket.id,
      deliveryId:deliveryId,
      shippingAddress:shippingAddress

    }
  }

}
