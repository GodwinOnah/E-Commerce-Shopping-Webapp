import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { take } from 'rxjs';
import { IOrders } from 'src/app/prodsharemod/models/IOrders';
import { BreadcrumbService } from 'xng-breadcrumb';
import { OrdersService } from '../orders/orders.service';

@Component({
  selector: 'app-orders-details',
  templateUrl: './orders-details.component.html',
  styleUrls: ['./orders-details.component.scss']
})
export class OrdersDetailsComponent implements OnInit{

  order?: IOrders;
 
  constructor(
    private activatedroute:ActivatedRoute,
    private breadcrumbService:BreadcrumbService,
    private orderService: OrdersService
    ){
      this.breadcrumbService.set('@OrderDetailed', ' ');
  }
  ngOnInit(): void {
    this.ViewOrder();
  }

  ViewOrder(){
    const id = +this.activatedroute.snapshot.paramMap.get('id');
    console.log(id)
    id && this.orderService.GetOrdersById(id).subscribe({
      next: order => {
        console.log(order)
        this.order = order;
        this.breadcrumbService.set('@OrderDetailed', `Order# ${order.id} - ${order.orderStatus}`);
} })
}
  }



