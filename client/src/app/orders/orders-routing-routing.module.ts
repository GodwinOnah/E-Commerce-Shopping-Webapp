import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { OrdersDetailsComponent } from '../orderDetails/orders-details.component';
import { OrdersComponent } from './orders.component';



const routes: Routes =[

  {path:'', component:OrdersComponent},
  {path: ':id', component: OrdersDetailsComponent, data: {breadcrumb: {alias: 'OrderDetails'}}}
]

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class OrdersRoutingRoutingModule { }
