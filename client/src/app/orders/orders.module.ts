import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { OrdersComponent } from './orders.component';
import { OrdersRoutingRoutingModule } from './orders-routing-routing.module';
import { OrdersDetailsComponent } from '../orderDetails/orders-details.component';
import { AddDeliveryComponent } from './add-delivery/add-delivery.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { UserAccountModule } from '../Account/account.module';
import { OrderDetailsPaidComponent } from 'app/order-details-paid/order-details-paid.component';

@NgModule({
  declarations: [
    OrdersComponent,
    OrdersDetailsComponent,
    OrderDetailsPaidComponent,
    AddDeliveryComponent 
  ],
  imports: [
    CommonModule,
    OrdersRoutingRoutingModule,
    ReactiveFormsModule,
    UserAccountModule,
    FormsModule
  ]
  
})
export class OrdersModule { }
