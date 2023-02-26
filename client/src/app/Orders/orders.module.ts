import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { OrdersComponent } from './orders.component';
import { OrdersDetailsComponent } from './orders-details.component';
import { OrdersRoutingRoutingModule } from './orders-routing-routing.module';



@NgModule({
  declarations: [
    OrdersComponent,
    OrdersDetailsComponent
  ],
  imports: [
    CommonModule
  ],
  exports: [OrdersRoutingRoutingModule]
})
export class OrdersModule { }
