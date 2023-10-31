import { Component, OnInit } from '@angular/core';
import { IOrders } from '../prodsharemod/models/IOrders';
import { OrdersService } from './orders.service';

@Component({
  selector: 'app-orders',
  templateUrl: './orders.component.html',
  styleUrls: ['./orders.component.scss']
})
export class OrdersComponent implements OnInit{

  orders: IOrders[];

  constructor(private orderservice: OrdersService){

  }
  ngOnInit(): void {
    this.GetOrders();
  }

  GetOrders(){
    this.orderservice.GetOrders().subscribe({
      next: orders=>{
        console.log(orders)
        this.orders = orders
      }
    })
  }

}
