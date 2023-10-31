import { Component } from '@angular/core';
import { BasketService } from 'app/basket/basket.service';


@Component({
  selector: 'app-order-total',
  templateUrl: './order-total.component.html',
  styleUrls: ['./order-toatal.component.scss']
})
export class OrderTotalComponent {

  constructor(public basketService:BasketService){

  }

}
