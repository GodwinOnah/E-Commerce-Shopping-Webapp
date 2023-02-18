import { Component } from '@angular/core';
import { IBasket, IBasketItem } from '../prodsharemod/models/IBasket';
import { BasketService } from './basket.service';
@Component({
  selector: 'app-basket',
  templateUrl: './basket.component.html',
  styleUrls: ['./basket.component.scss']
})
export class BasketComponent {
  constructor(public basketService: BasketService){
  }
  IncreaseQuantity(items:IBasketItem){
    this.basketService.AddItemsToBasket(items);
  }
  ReduceQuantity(event:{id:number,quantity:number}){
   this.basketService.RemoveItemsFromBasket(event.id,event.quantity);

  }

}
