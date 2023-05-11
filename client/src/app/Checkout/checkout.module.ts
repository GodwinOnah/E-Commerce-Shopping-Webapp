import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CheckoutComponent } from './checkout.component';
import { CheckoutRoutingModule } from './checkout-routing.module';
import { BasketComponent } from '../basket/basket.component';
import { ProdsharemodModule } from '../prodsharemod/prodsharemod.module';
import { CheckoutAddressComponent } from './checkouts/checkout-address/checkout-address.component';
import { CheckoutDeliveryComponent } from './checkouts/checkout-delivery/checkout-delivery.component';
import { CheckoutReviewComponent } from './checkouts/checkout-review/checkout-review.component';
import { CheckoutPaymentComponent } from './checkouts/checkout-payment/checkout-payment.component';
import { SuccessComponent } from './success/success.component';
import { RouterModule } from '@angular/router';
import { CheckoutServiceService } from './checkout-service.service';




@NgModule({
  declarations: [
    CheckoutComponent,
    CheckoutAddressComponent,
    CheckoutDeliveryComponent,
    CheckoutReviewComponent,
    CheckoutPaymentComponent,
    SuccessComponent,
  ],
  imports: [
    CommonModule,
    CheckoutRoutingModule,
    ProdsharemodModule,
    RouterModule
    


  ]
})
export class CheckoutModule { }
