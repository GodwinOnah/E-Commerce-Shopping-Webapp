import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { BreadcrumbService } from 'xng-breadcrumb';
import { OrdersService } from '../orders/orders.service';
import { IAdminOrder } from '../prodsharemod/models/IAdminOrder';
import { IOrders } from '../prodsharemod/models/IOrders';

@Component({
  selector: 'app-order-details-paid',
  templateUrl: './order-details-paid.component.html',
  styleUrls: ['./order-details-paid.component.scss']
})
export class OrderDetailsPaidComponent {

  order?: IAdminOrder;
 
  constructor(
    private activatedroute:ActivatedRoute,
    private breadcrumbService:BreadcrumbService,
    private orderService: OrdersService
    ){
      this.breadcrumbService.set('@OrderDetailed', ' ');
  }
  ngOnInit(): void {
    this.ViewPaidOrder();
  }

  ViewPaidOrder(){
    const id = +this.activatedroute.snapshot.paramMap.get('id');
    id && this.orderService.GetAdminOrdersById(id).subscribe({
      next: order => {
        this.order = order;
        this.breadcrumbService.set('@OrderDetailed', `Order# ${order.id} - ${order.orderStatus}`);
} })
}

}
