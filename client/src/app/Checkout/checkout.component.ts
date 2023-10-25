import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { UserAccountService } from '../Account/account.service';
import { BasketService } from '../basket/basket.service';

@Component({
  selector: 'app-checkout',
  templateUrl: './checkout.component.html',
  styleUrls: ['./checkout.component.scss']
})
export class CheckoutComponent implements OnInit{

  errors : string[] | null = null;

  constructor(private fb : FormBuilder, 
    private accountService:UserAccountService, 
    private basketService : BasketService,
   ){}

  ngOnInit(): void {
    this.AttachAddress();   
    this.AttachDelivery();
  
  }

checkOutForm = this.fb.group({
      addressForm :  this.fb.group({
          firstName: ['',Validators.required],
          middleName: [''],
          lastName: ['',Validators.required],
          street: ['',Validators.required],
          city: ['',Validators.required],
          country: ['',Validators.required],
          zipcode: ['',Validators.required],
          phone: ['',Validators.required],
      }),

      deliveryForm :  this.fb.group({
        delivery : ['']
      }),

      paymentForm :  this.fb.group({
          nameOnCard : ['',Validators.required]
        })
    })

    AttachAddress(){
      const token = localStorage.getItem('token');
      this.accountService.GetAddress(token).subscribe({
        next: address => {
         address && this.checkOutForm?.get('addressForm')?.patchValue(address)
        }
      })
    }
    
    AttachDelivery(){  
      const basket = this.basketService.CurrentBasket();    
      if(basket && basket.deliveryId){    
        this.checkOutForm.get('deliveryForm')?.get('delivery')
        ?.patchValue(basket.deliveryId.toString());
      }      
    }
}
