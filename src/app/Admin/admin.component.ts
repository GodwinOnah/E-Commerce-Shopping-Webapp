import { Component} from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ToastrService } from 'ngx-toastr';
import { UserAccountService } from '../Account/account.service';
import { AdvertsComponent } from '../Adverts/adverts/adverts.component';
import { AdvertsService } from '../Adverts/adverts/adverts.service';
import { AddDeliveryComponent } from '../orders/add-delivery/add-delivery.component';
import { OrdersService } from '../orders/orders.service';
import { IAdminOrder } from '../prodsharemod/models/IAdminOrder';
import { IAdverts } from '../prodsharemod/models/IAdverts';
import { IDelivery } from '../prodsharemod/models/IDelivery';
import { ProductBrandComponent } from '../products/product-brand/product-brand.component';
import { ProductTypeComponent } from '../products/product-type/product-type.component';
import { ItemsComponent } from '../products/productItems/items/items.component';


@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.scss']
})
export class AdminComponent {
  
  admin: string ="";
  customerName: string ="";
  adminOrders: IAdminOrder[]=[];
  confirm: boolean =  false;
  advertsString : IAdverts[] = [];
  errors : string[] | null = null;
  exit : number ;
  notice : boolean = false;
  delNotice : boolean = false;
  deliveries : IDelivery[]=[];

  constructor(
    private matdialog : MatDialog,
    private orderservice: OrdersService,
    private toastr : ToastrService,
    public accountService : UserAccountService,
    private advert : AdvertsService){}

    ngOnInit(): void {
      this.GetPaidOrders();
      this.GetAdverts();
      this.GetDelivery();
      
    }
    
  openUploadProduct(){
    this.closeDialog();
    this.matdialog.open(ItemsComponent,
      {height: 'auto',
    width: '80%'});
  }

  openUploadType(){
    this.closeDialog();
    this.matdialog.open(ProductTypeComponent,
      {height: 'auto',
    width: '40%'});
  }

  closeDialog(){
    this.matdialog.closeAll(); // <- Close the mat dialog
  }

  openUploadBrand(){
    this.closeDialog();
    this.matdialog.open(ProductBrandComponent,
      {height: 'auto',
    width: '40%'});
  }

  openAddDelivery(){
    this.closeDialog();
    this.matdialog.open(AddDeliveryComponent,
      {height: 'auto',
    width: '70%'});
  }

  openAdvertDialog(){
    this.closeDialog();
    this.matdialog.open(AdvertsComponent,
      {height: 'auto',
    width: '40%'});
  }

  GetPaidOrders(){
    this.orderservice.GetAdminOrders().subscribe({
      next: adminOrders => {
        this.adminOrders = adminOrders;
      }
    })
  }

  confirmer(){
      this.confirm = true;
  } 

  GetAdverts(){
      this.advert.getAdverts().subscribe({
        next : advert => {

          if(advert)
              this.advertsString = advert ;

              if(advert.length == 0){
                this.exit = 0; 
                this.notice = true;
              } 
          
              for(let x of advert) {  
                this.exit = x.time; 
                setInterval(()=>{      
                this.deleteAdvert(x.id);
                       },x.time*1000);
            }
        },
          error : error => { 
            this.errors = error.errors
            this.toastr.success("Can't get advert Ids");
          }
      });
      }

      deleteDelivery(id:number){
        console.log(33)
        this.orderservice.deleteDelivery(id).subscribe({
          next : yes => {
               if(yes){
                window.location.reload(); 
                this.toastr.success("delivery deleted"); 
               } 
          },
            error : error => { 
              this.errors = error.errors
              this.toastr.success("Delivery not delivery");
            }
        });
      }

      deleteAdvert(id:number){
        this.advert.deleteAdverts(id).subscribe({
          next : yes => {
               if(yes){
                this.toastr.success("Advert deleted");
                window.location.reload();  
               } 
          },
            error : error => { 
              this.errors = error.errors
              this.toastr.success("Can't get advert Ids");
            }
        });
      }

      GetDelivery(){
        this.orderservice.getDelivery().subscribe({
          next: deliveries=>{ 
            this.delNotice=true; 
              this.deliveries = deliveries
        },
          error:error=>console.log(error)         
      });
      }
}
