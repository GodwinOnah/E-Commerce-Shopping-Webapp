import { Component, EventEmitter, Input, Output } from '@angular/core';
import { BasketService } from 'src/app/basket/basket.service';
import { IBasketItem } from '../models/IBasket';

@Component({
  selector: 'app-basket-summary',
  templateUrl: './basket-summary.component.html',
  styleUrls: ['./basket-summary.component.scss']
})
export class BasketSummaryComponent {

  @Output() addItem = new EventEmitter<IBasketItem>();
  @Output() removeItem = new EventEmitter<{id:number,quantity:number}>();
  @Input() isBasket = true;

  constructor(public basketService : BasketService){}

  AddItem(item:IBasketItem){
    this.addItem.emit(item);
  }

  RemoveItem(id:number,quantity:number){
    this.removeItem.emit({id,quantity});
  }

}
