import { Component } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { LoginComponent } from '../Account/login/login.component';
import { Basket, IBasket, IBasketItem } from '../prodsharemod/models/IBasket';
import { BasketService } from './basket.service';
@Component({
  selector: 'app-basket',
  templateUrl: './basket.component.html',
  styleUrls: ['./basket.component.scss']
})
export class BasketComponent {
  loginStatus = false;

  constructor(
    public basketService: BasketService,
     private matdialog:MatDialog){
  }
  IncreaseQuantity(items:IBasketItem){
    this.basketService.AddItemsToBasket(items);
  }
  ReduceQuantity(event:{id:number,quantity:number}){
   this.basketService.RemoveItemsFromBasket(event.id,event.quantity);

  }

  checkLogin(){
        if(localStorage.getItem("login")=="true")
        return true;
  }

  openLoginDialog(){
    this.matdialog.open(LoginComponent,
      {height: 'auto',
    width: '50%'});
  }

  deleteBasket(basket:Basket){
      this.basketService.DeleteBasket(basket);
  }

}
