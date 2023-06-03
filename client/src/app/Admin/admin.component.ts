import { Component } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ToastrService } from 'ngx-toastr';
import { UserAccountService } from '../Account/account.service';
import { AdvertsComponent } from '../Adverts/adverts/adverts.component';
import { AdvertsService } from '../Adverts/adverts/adverts.service';
import { OrdersService } from '../orders/orders.service';
import { IAdminOrder } from '../prodsharemod/models/IAdminOrder';
import { IAdverts } from '../prodsharemod/models/IAdverts';
import { IOrders } from '../prodsharemod/models/IOrders';
import { ProductBrandComponent } from '../products/product-brand/product-brand.component';
import { ProductTypeComponent } from '../products/product-type/product-type.component';
import { ItemsComponent } from '../products/productItems/items/items.component';
// import { setInterval,clearInterval} from 'timers';


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

  constructor(
    private matdialog : MatDialog,
    private orderservice: OrdersService,
    private toastr : ToastrService,
    public accountService : UserAccountService,
    private advert : AdvertsService)
    {

    }

    ngOnInit(): void {
      this.GetPaidOrders();
      this.GetAdverts();
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
      this.confirm =true;
  } 

  GetAdverts(){
      this.advert.getAdverts().subscribe({
        next : advert => {
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
}
