import { Component } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { UserAccountService } from 'app/Account/account.service';
import { BasketService } from 'app/basket/basket.service';
import { IBasketItem } from 'app/prodsharemod/models/IBasket';




@Component({
  selector: 'app-nav-bar',
  templateUrl: './nav-bar.component.html',
  styleUrls: ['./nav-bar.component.scss']
})
export class NavBarComponent {

 start=0;
 login: boolean = true

  constructor(public basketService:BasketService,
     public accountservice:UserAccountService){

  }

  TotalQuantity(items:IBasketItem[]){

    return items.reduce((sum,item)=>sum+item.quantity,0)
  }

  Logout(){
    this.accountservice.Logout();
  }

  closeDialog(){
    this.accountservice.closeDialog();
  }

  openLoginDialog(){
    this.accountservice.openLoginDialog();
  }
  openRegDialog(){
    this.accountservice.openRegDialog();  
  }

}
