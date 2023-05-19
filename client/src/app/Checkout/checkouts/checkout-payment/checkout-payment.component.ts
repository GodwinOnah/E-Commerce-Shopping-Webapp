import { Component, ElementRef, Input, OnInit, ViewChild } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { NavigationExtras, Route, Router } from '@angular/router';
import { loadStripe, ShippingAddress, Stripe, StripeCardCvcElement, StripeCardExpiryElement, StripeCardNumberElement } from '@stripe/stripe-js';
import { ToastrService } from 'ngx-toastr';
import { firstValueFrom } from 'rxjs';
import { BasketService } from 'src/app/basket/basket.service';
import { IBasket } from 'src/app/prodsharemod/models/IBasket';
import { IOrderToCreate } from 'src/app/prodsharemod/models/IOrderToCreate';
import { Address } from 'src/app/prodsharemod/models/User';
import { CheckoutServiceService } from '../../checkout-service.service';

@Component({
  selector: 'app-checkout-payment',
  templateUrl: './checkout-payment.component.html',
  styleUrls: ['./checkout-payment.component.scss']
})
export class CheckoutPaymentComponent implements OnInit{
  errors : string[] | null = null;
  @Input() checkOutForm? : FormGroup;
  @ViewChild('cardNumber') cardNumberElement?:ElementRef;
  @ViewChild('cardExpiry') cardExpiryElement?:ElementRef;
  @ViewChild('cardCvc') cvcElement?:ElementRef;
  stripe:Stripe|null=null;
  cardNumber?:StripeCardNumberElement;
  cardExpiry?:StripeCardExpiryElement;
  cvc?:StripeCardCvcElement;
  cardNumberComplete=false;
  cardExpiryComplete=false;
  cvcComplete=false;
  cardErrors:any;
  loading=false;
  year: number;
  yearSub:number;


    constructor(private basketService:BasketService,
    private checkOutService:CheckoutServiceService,
    private toastr:ToastrService,
    private router:Router){

  }
  ngOnInit(): void {
    this.year = new Date().getFullYear();
    this.yearSub = Number(this.year.toString().substring(2,4));
   loadStripe('pk_test_51Mcx2FB7QPlKfZO42IAdvFhiWvLmJJqyarpwQZYE8Mes7QioM5QNIme3OPI0KBP7tnLRf43CLRSzmCa0xzv37VmJ00VDpXrD7T')
   .then(stripe=>{
    this.stripe = stripe;
    const elements=stripe?.elements();
    if(elements){
      this.cardNumber = elements.create('cardNumber');
      this.cardNumber.mount(this.cardNumberElement?.nativeElement);
      this.cardNumber.on('change',event=>{
        this.cardNumberComplete = event.complete;
        if(event.error)
            this.cardErrors=event.error.message;
        else{this.cardErrors=null}
      })
      this.cardExpiry = elements.create('cardExpiry');
      this.cardExpiry.mount(this.cardExpiryElement?.nativeElement);
      this.cardExpiry.on('change',event=>{
        this.cardExpiryComplete = event.complete;
        if(event.error)
            this.cardErrors=event.error.message;
        else{this.cardErrors=null}
      })
      this.cvc = elements.create('cardCvc');
      this.cvc.mount(this.cvcElement?.nativeElement);
      this.cvc.on('change',event=>{
        this.cvcComplete = event.complete;
        if(event.error)
            this.cardErrors = event.error.message;
        else{this.cardErrors = null}
      })
    }
   })
  }

  get paymentIsComplete(){
   return this.checkOutForm.get('paymentForm')?.valid
    && this.cardNumberComplete && this.cardExpiryComplete
    && this.cvcComplete
  }

  private async ConfirmPaymentUsingStripe(basket: IBasket | null) {
    if (!basket)throw new Error('basket is null');
    const result =  this.stripe?.confirmCardPayment(basket.clientSecret,{
      payment_method:{
        card:this.cardNumber,
        billing_details:{
          name :this.checkOutForm?.get('paymentForm')?.get('nameOnCard')?.value
        }
      }});
      if(!result)throw new Error('problem confirming problem with stripe');
    return result;
  }
  
  private GetOrderDetails(basket: IBasket):IOrderToCreate {
  
    const shippingAddress = this.checkOutForm?.get('addressForm')?.value as ShippingAddress;
    if(!shippingAddress)throw new Error('No Address added');
    
    return{
      basketId:basket.id,
      deliveryId:basket.deliveryId,
      shippingAddress:shippingAddress

    }
  }

  private async CreateOrder(basket: IBasket |null) {

    if (!basket)throw new Error('basket is null');
    const orderToCreate = this.GetOrderDetails(basket);
    return firstValueFrom(this.checkOutService.CreateAnOrder(orderToCreate));
   ;
  }

  async OrderSubmission(){
    this.loading=true;
    const basket = this.basketService.CurrentBasket();
    if (!basket) throw new Error("Cannot get basket");
    try{
      const createdOrder = await this.CreateOrder(basket);
      const paymentResult= await this.ConfirmPaymentUsingStripe(basket);
      if(paymentResult.paymentIntent){
            this.basketService.DeleteBasket(basket);
            const navigationExtras :NavigationExtras={state:createdOrder};
            this.router.navigate(['Checkout/success'],navigationExtras);
          }
          else{
            this.toastr.error(paymentResult.error.message);     
    }
  }
    catch(error){
      this.toastr.error(error.message);
    }

    finally{
      this.loading=false;
    }
  }
}
