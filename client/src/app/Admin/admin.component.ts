import { Component } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { OrdersService } from '../orders/orders.service';
import { IAdminOrder } from '../prodsharemod/models/IAdminOrder';
import { IOrders } from '../prodsharemod/models/IOrders';
import { ItemsComponent } from '../products/productItems/items/items.component';


@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.scss']
})
export class AdminComponent {

  admin: string ="";
  adminOrders: IAdminOrder[];
  confirm: boolean =  false;

  constructor(
    private matdialog : MatDialog,
    private orderservice: OrdersService){}

    ngOnInit(): void {
      this.GetPaidOrders();
    }
    
  openUploadProduct(){
    this.matdialog.open(ItemsComponent,
      {height: '70%',
    width: '50%'});
  }

  GetPaidOrders(){
    this.orderservice.GetAdminOrders().subscribe({
      next: adminOrders=>{
        console.log(adminOrders.map(x=>x.shippingAddress))
        this.adminOrders=adminOrders
      }
    })
  }

  confirmer(){
      this.confirm =true;
  }

  deleteAdminOrder(){
    this.orderservice.GetAdminOrders().subscribe()
  }

  
 
}
