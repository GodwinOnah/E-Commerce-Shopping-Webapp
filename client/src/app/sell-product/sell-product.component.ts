import { Component } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { UserAccountService } from 'app/Account/account.service';
import { ItemsComponent } from 'app/products/productItems/items/items.component';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-sell-product',
  templateUrl: './sell-product.component.html',
  styleUrls: ['./sell-product.component.scss']
})
export class SellProductComponent {

  constructor(
    private matdialog : MatDialog,
    // private orderservice: OrdersService,
    private toastr : ToastrService,
    public accountService : UserAccountService,
    // private advert : AdvertsService
    ){}
 addItem(){
  

    this
        .matdialog
        .open(ItemsComponent, {
            height: 'auto',
            width: '80%'
     
}
        );
}}
