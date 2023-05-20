import { Component } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { OrdersService } from '../orders/orders.service';
import { IOrders } from '../prodsharemod/models/IOrders';
import { ItemsComponent } from '../products/productItems/items.component';


@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.scss']
})
export class AdminComponent {

  admin: string ="";
  orders: IOrders[];


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
    this.orderservice.GetPaidOrders().subscribe({
      next: orders=>{
        console.log(orders)
        this.orders=orders
      }
    })
  }
 
}
