import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { OrdersComponent } from './orders.component';
import { OrdersRoutingRoutingModule } from './orders-routing-routing.module';
import { OrdersDetailsComponent } from '../orderDetails/orders-details.component';



@NgModule({
  declarations: [
    OrdersComponent,
    OrdersDetailsComponent
   
  ],
  imports: [
    CommonModule,
    OrdersRoutingRoutingModule
  ]
  
})
export class OrdersModule { }
