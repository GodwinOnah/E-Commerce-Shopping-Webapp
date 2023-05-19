import { CdkStepper } from '@angular/cdk/stepper';
import { Component, Input } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { BasketService } from 'src/app/basket/basket.service';

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
        this.errors = error.errors  }    
    })
  }

}
