import { Component, OnInit } from '@angular/core';
import { BasketService } from './basket/basket.service';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent 
{
  
  title = 'BagShop';

  

  constructor(private basketService: BasketService){

  }

  ngOnInit(): void {

    const basketId = localStorage.getItem('basket_id')
    
      this.basketService.GetBasket(basketId);
    
    
}}
