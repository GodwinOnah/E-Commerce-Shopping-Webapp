import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CheckoutComponent } from './checkout.component';
import { CheckoutRoutingModule } from './checkout-routing.module';
import { ProdsharemodModule } from '../prodsharemod/prodsharemod.module';
import { CheckoutAddressComponent } from './checkouts/checkout-address/checkout-address.component';
import { CheckoutDeliveryComponent } from './checkouts/checkout-delivery/checkout-delivery.component';
import { CheckoutReviewComponent } from './checkouts/checkout-review/checkout-review.component';
import { CheckoutPaymentComponent } from './checkouts/checkout-payment/checkout-payment.component';
import { SuccessComponent } from './success/success.component';
import { RouterModule } from '@angular/router';


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
