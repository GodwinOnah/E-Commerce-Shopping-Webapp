import { Component } from '@angular/core';
import { BasketService } from 'src/app/basket/basket.service';

@Component({
  selector: 'app-order-toatal',
  templateUrl: './order-toatal.component.html',
  styleUrls: ['./order-toatal.component.scss']
})
export class OrderToatalComponent {

  constructor(public basketService:BasketService){

  }

}
