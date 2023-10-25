import { Component } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { UserAccountService } from 'app/Account/account.service';
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

}
