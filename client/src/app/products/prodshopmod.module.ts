import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProdshopmodComponent } from './prodshopmod.component';
import { ProdsharemodModule } from '../prodsharemod/prodsharemod.module';
import { ProductItemChildComponent } from './product-item-child.component';
import { ProductDetaialsComponent } from './product-detaials/product-detaials.component';
import { ProdshopmodRoutingModule } from './prodshopmod-routing.module';
import { CarouselModule } from 'ngx-bootstrap/carousel';
import { ProductAdvertsComponent } from './product-adverts/product-adverts.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ItemsComponent } from './productItems/items/items.component';
import {ConfirmBoxConfigModule, NgxAwesomePopupModule} from '@costlydeveloper/ngx-awesome-popup';
import { ProductBrandComponent } from './product-brand/product-brand.component';
import { ProductTypeComponent } from './product-type/product-type.component';



@NgModule({
  declarations: [
    ProdshopmodComponent,
    ProductItemChildComponent,
    ProductDetaialsComponent,
    ProductAdvertsComponent,
    ItemsComponent,
    ProductBrandComponent,
    ProductTypeComponent
  
  ],
  imports: [
    CommonModule,
    ProdsharemodModule,
    ProdshopmodRoutingModule,
    CarouselModule,
    ReactiveFormsModule,
    FormsModule
  ],
  exports :[ProdshopmodComponent,
    ProductDetaialsComponent
   
  ]
})
export class ProdshopmodModule { }
