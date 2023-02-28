import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { take } from 'rxjs';
import { BreadcrumbService } from 'xng-breadcrumb';
import { BasketService } from '../basket/basket.service';
import { IOrders } from '../prodsharemod/models/IOrders';
import { OrdersService } from './orders.service';

@Component({
  selector: 'app-orders-details',
  templateUrl: './orders-details.component.html',
  styleUrls: ['./orders-details.component.scss']
})
export class OrdersDetailsComponent implements OnInit{

  order?: IOrders;
 
  constructor(
    private orderService: OrdersService,
    private activatedroute:ActivatedRoute,
    private breadcrumbService:BreadcrumbService,

    ){

  }
  ngOnInit(): void {
   
  }

  ViewOrder(){
    const id = +this.activatedroute.snapshot.paramMap.get('id');
    // console.log(id)
    id && this.orderService.  GetOrdersById(id).subscribe({
      next: order => {
        this.order = order;
        this.breadcrumbService.set('@OrderDetailed', `Order# ${order.id} - ${order.orderStatus}`);
} })
}
  }



