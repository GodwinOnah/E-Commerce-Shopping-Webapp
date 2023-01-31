import { Component } from '@angular/core';
import { BasketService } from 'src/app/basket/basket.service';
import { IBasketItem } from 'src/app/prodsharemod/models/IBasket';

@Component({
  selector: 'app-nav-bar',
  templateUrl: './nav-bar.component.html',
  styleUrls: ['./nav-bar.component.scss']
})
export class NavBarComponent {

 start=0;

  constructor(public basketService:BasketService){

  }

  TotalQuantity(items:IBasketItem[]){

    return items.reduce((sum,item)=>sum+item.quantity,0)
  }

}
