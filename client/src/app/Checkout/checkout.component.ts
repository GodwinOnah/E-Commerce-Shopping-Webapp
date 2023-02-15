import { Component } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';

@Component({
  selector: 'app-checkout',
  templateUrl: './checkout.component.html',
  styleUrls: ['./checkout.component.scss']
})
export class CheckoutComponent {

  constructor(private fb : FormBuilder){}
  
    checkOutForm = this.fb.group({
      addressForm :  this.fb.group({
          firstname: ['',Validators.required],
          middlename: [''],
          familyname: ['',Validators.required],
          address: ['',Validators.required],
          city: ['',Validators.required],
          country: ['',Validators.required],
          zipcode: ['',Validators.required],
          phone: ['',Validators.required],

      }),
      deliveryForm :  this.fb.group({
        delivery: ['',Validators.required]}),

      paymentForm :  this.fb.group({
          nameOnCard : ['',Validators.required]})
    })
}
