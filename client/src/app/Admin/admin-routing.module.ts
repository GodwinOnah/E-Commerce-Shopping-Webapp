import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AdminComponent } from './admin.component';
import { RouterModule, Routes } from '@angular/router';
import { OrdersDetailsComponent } from '../orderDetails/orders-details.component';
import { OrderDetailsPaidComponent } from '../order-details-paid/order-details-paid.component';

const routes: Routes =[

  {path:'', component:AdminComponent},
  {path: ':id', component: OrderDetailsPaidComponent, data: {breadcrumb: {alias: 'OrderDetails'}}}
]

@NgModule({
  declarations: [],
  imports: [RouterModule.forChild(routes)],
   exports: [RouterModule]
  
})
export class AdminRoutingModule { }
