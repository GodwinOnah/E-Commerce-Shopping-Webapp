import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { UserAccountService } from '../Account/account.service';
import { BasketService } from '../basket/basket.service';
import { IOrderToCreate } from '../prodsharemod/models/IOrderToCreate';

@Component({
  selector: 'app-checkout',
  templateUrl: './checkout.component.html',
  styleUrls: ['./checkout.component.scss']
})
export class CheckoutComponent implements OnInit{

  constructor(private fb : FormBuilder, 
    private accountService:UserAccountService, 
    private basketService : BasketService){}

  ngOnInit(): void {
    // this.AttachAddress();   
    this.AttachDelivery();
  
  }

checkOutForm = this.fb.group({
      addressForm :  this.fb.group({
          FirstName: ['',Validators.required],
          MiddleName: [''],
          LastName: ['',Validators.required],
          Street: ['',Validators.required],
          City: ['',Validators.required],
          Country: ['',Validators.required],
          Zipcode: ['',Validators.required],
          Phone: ['',Validators.required],
      }),

      deliveryForm :  this.fb.group({
        delivery : ['',Validators.required]
      }),

      paymentForm :  this.fb.group({
          nameOnCard : ['',Validators.required]
        })
    })

    AttachAddress(){
      this.accountService.GetAddress().subscribe({
        next: address => {
          address && this.checkOutForm.get('addressForm')?.patchValue(address)
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
