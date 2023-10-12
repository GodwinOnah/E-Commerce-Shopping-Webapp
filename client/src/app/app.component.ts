import { Component, OnInit } from '@angular/core';
import { UserAccountService } from './Account/account.service';
import { BasketService } from './basket/basket.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent 
{ 
  title = 'BagShop';

constructor(
  private basketService: BasketService,
  private accountService:UserAccountService,){
  }

ngOnInit(): void {
  this.loadBasket();
 this.loadPreviousUser();     
}

loadBasket(){
  const basketId = localStorage.getItem('basket_id')   
  this.basketService.GetBasket(basketId);
}

loadPreviousUser(){
 const token = localStorage.getItem('token');
  this.accountService.LoadPreviousUser(token).subscribe();
}
}
