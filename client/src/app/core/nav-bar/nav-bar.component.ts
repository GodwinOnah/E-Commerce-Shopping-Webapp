import { Component } from '@angular/core';
import { UserAccountService } from 'src/app/Account/account.service';
import { BasketService } from 'src/app/basket/basket.service';
import { IBasketItem } from 'src/app/prodsharemod/models/IBasket';
import {  MatDialog } from '@angular/material/dialog';
import { LoginComponent } from 'src/app/Account/login/login.component';
import { RegisterComponent } from 'src/app/Account/Register/register.component';



@Component({
  selector: 'app-nav-bar',
  templateUrl: './nav-bar.component.html',
  styleUrls: ['./nav-bar.component.scss']
})
export class NavBarComponent {

 start=0;
 login: boolean = true

  constructor(public basketService:BasketService,
     public accountservice:UserAccountService,
     private matdialog: MatDialog){

  }

  TotalQuantity(items:IBasketItem[]){

    return items.reduce((sum,item)=>sum+item.quantity,0)
  }

  Logout(){
    this.accountservice.Logout();
  }

  openLoginDialog(){
    this.accountservice.openLoginDialog();
  }
  openRegDialog(){
    this.accountservice.openRegDialog();
    
  }

}
