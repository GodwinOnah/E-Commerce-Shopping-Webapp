import { CdkStepper } from '@angular/cdk/stepper';
import { Component, Input } from '@angular/core';
import { BasketService } from 'app/basket/basket.service';
import { ToastrService } from 'ngx-toastr';


@Component({
  selector: 'app-checkout-review',
  templateUrl: './checkout-review.component.html',
  styleUrls: ['./checkout-review.component.scss']
})
export class CheckoutReviewComponent {
  @Input() appStepper?:CdkStepper;
  errors : string[] | null = null;

  constructor(private basketService:BasketService,
    private toastr:ToastrService){

      
  }

  CreatePaymentIntent(){
    this.basketService.CreatePaymentIntent().subscribe({
      next:()=>{this.toastr.success("Proceed with correct card details");
      this.appStepper?.next()},
      error : error => { 
        this.toastr.success("PaymentIntent not created");
        this.toastr.success("If failure persist, why not try to clear basket and re-select again");
        this.errors = error.errors  }    
    })
  }

}
