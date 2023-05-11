import { Component, Input } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { UserAccountService } from 'src/app/Account/account.service';
import { CheckoutComponent } from '../../checkout.component';

@Component({
  selector: 'app-checkout-address',
  templateUrl: './checkout-address.component.html',
  styleUrls: ['./checkout-address.component.scss']
})
export class CheckoutAddressComponent {

  @Input() checkOutForm?: FormGroup;
  errors : string[] | null = null;

  constructor(private  accountService : UserAccountService,
    private toastr : ToastrService){

  }

  UpdateAddress(){

    const address = this.checkOutForm?.get('addressForm')?.value;
    this.accountService.UpdateAddress(address).subscribe({
      next: ()=>{
         this.toastr.success("Address updated succecssfully");
         this.checkOutForm?.get('addressForm')?.reset(this.checkOutForm?.get('addressForm')?.value);
         },
      error : error => { 
        this.toastr.success("Address not updated");
        this.errors = error.errors  } 
      
    });
    

}}
