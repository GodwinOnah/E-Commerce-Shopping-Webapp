import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { BreadcrumbService } from 'xng-breadcrumb';
import { OrdersService } from '../orders/orders.service';

import { IAdminOrder } from '../prodsharemod/models/IAdminOrder';
import { IOrderConfirmation } from '../prodsharemod/models/IOrderConfirmation';
import { IOrders } from '../prodsharemod/models/IOrders';

@Component({
  selector: 'app-order-details-paid',
  templateUrl: './order-details-paid.component.html',
  styleUrls: ['./order-details-paid.component.scss']
})
export class OrderDetailsPaidComponent {

  order?: IAdminOrder;
  errors : string[] | null = null;
  confirm : boolean = false;
 
  constructor(
    private activatedroute:ActivatedRoute,
    private breadcrumbService:BreadcrumbService,
    private orderService: OrdersService,
    private router : Router,
    private toastr : ToastrService
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
        if(order.confirmation==="confirmed")
        this.confirm=true;
        this.order = order;
        this.breadcrumbService.set('@OrderDetailed', `Order# ${order.id} - ${order.orderStatus}`);
} })
}

deleteAdminOrder(id:number){
  
  this.orderService.DeleteAdminOrder(id).subscribe(
    {
      next: yes =>{
        if(yes) this.toastr.success("Order deleted") ;
        this.router.navigateByUrl('/Admin');

      },
      error : error => {
        this.toastr.success("Order not deleted") 
        this.errors = error.errors}
      
    }
  )
}

OrderConfirmation(orderConfirmed : IOrderConfirmation){
      
  this.orderService.UpdateOrderConfirmation(orderConfirmed).subscribe({
    next: yes =>{
      this.confirm=true;
      if(yes) this.toastr.success("Order registered as confirmed on customer end");
      this.router.navigateByUrl('/Admin');

    },
    error : error => {
      this.toastr.success("Order not confirmed on customer end") 
      this.errors = error.errors} 
  })
}

AdminOrderConfirmation(id:number,email:string){

  if (this.ButtonTxt=="Confirmed"){
    this.toastr.success("Order already confirmed") 
    return;
  } 

  var adminOrderConfirmed = {
    id:id,
    Email:email
  }

  this.orderService.UpdateAdminOrderConfirmation(adminOrderConfirmed ).subscribe({
    next: yes =>{
      this.confirm=true;
      if(yes) {
        this.toastr.success("Order confirmed");
        this.OrderConfirmation(adminOrderConfirmed);
      }
     
      this.router.navigateByUrl('/Admin');

    },
    error : error => {
      this.toastr.success("Order not yet confirmed by seller") 
      this.errors = error.errors} 
  })
}

get ButtonTxt(){
  return this.confirm == true ? "Confirmed":"Confirm Order"   
  }
}
