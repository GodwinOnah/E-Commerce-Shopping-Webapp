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
  errors : string[] | null = null;

  @Input() checkOutForm? : FormGroup;

    constructor(private basketService:BasketService,
    private checkOutService:CheckoutServiceService,
    private toastr:ToastrService){

  }
  CreatePaymentIntent(){
    this.basketService.CreatePaymentIntent().subscribe({
      next:()=>this.toastr.success("PaymentIntent created succecssfully"),
      error : error => { 
        this.toastr.success("PaymentIntent not created");
        this.errors = error.errors  }    
    })
  }

  OrderSubmission(){
    this.CreatePaymentIntent();
    const basket = this.basketService.CurrentBasket();
    if(!basket)return;
    const orderToCreate = this.GetOrderDetails(basket);
   
    if(!orderToCreate)return;
    this.checkOutService.CreateAnOrder(orderToCreate).subscribe({
      next: order=>{  
        this.toastr.success("Submitted succecssfully") 
        console.log(order);
      },
      error : error => { 
        this.toastr.success("Order not submitted");
        this.errors = error.errors  } 
      
    })
  }
  private GetOrderDetails(basket: IBasket) {
    console.log(57)
    const deliveryId = this.checkOutForm?.get('deliveryForm')?.get('delivery')?.value;
    console.log(deliveryId)
    const shippingAddress = this.checkOutForm?.get('addressForm')?.value as Address;
    console.log(shippingAddress)
    if(!deliveryId && !shippingAddress)return;
    return{
      basketId:basket.id,
      deliveryId:deliveryId,
      shippingAddress:shippingAddress

    }
  }

}
