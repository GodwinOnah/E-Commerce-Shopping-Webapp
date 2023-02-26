import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { BreadcrumbService } from 'xng-breadcrumb';
import { IOrders } from '../prodsharemod/models/IOrders';
import { OrdersService } from './orders.service';

@Component({
  selector: 'app-orders-details',
  templateUrl: './orders-details.component.html',
  styleUrls: ['./orders-details.component.scss']
})
export class OrdersDetailsComponent implements OnInit{

  order: IOrders;

  constructor(private orderService: OrdersService,
    private activatedroute:ActivatedRoute,
    private breadcrumbService:BreadcrumbService
    ){

  }
  ngOnInit(): void {
   
  }

  ViewOrder(){
    const id = +this.activatedroute.snapshot.paramMap.get('id');
    // console.log(id)
    if(id)this.orderService.GetOrdersById(id).subscribe(
          { next : order=>
              {
              this.order = order;
              this.breadcrumbService.set('@OrderDetailed', `Order# ${order.id} - ${order.orderStatus}`);
              // this.basketService.basket$.pipe(take(1)).subscribe({
              //   next : basket=>{
              //     const item = basket?.items.find ( i=>i.productId === id )
              //                 if(item){
              //                   this.quantity = item.quantity;
              //                   this.quantityInBasket=item.quantity
              //                         }
              //                  }

              //                                                     })
             },
                error:error=>console.log(error)
            })
  }


}
