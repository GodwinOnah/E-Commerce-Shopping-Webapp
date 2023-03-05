import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProdshopmodComponent } from './prodshopmod.component';
import { ProdsharemodModule } from '../prodsharemod/prodsharemod.module';
import { ProductItemChildComponent } from './product-item-child.component';
import { ProductDetaialsComponent } from './product-detaials/product-detaials.component';
import { ProdshopmodRoutingModule } from './prodshopmod-routing.module';
import { CarouselModule } from 'ngx-bootstrap/carousel';
import { ProductAdvertsComponent } from './product-adverts/product-adverts.component';



@NgModule({
  declarations: [
    ProdshopmodComponent,
    ProductItemChildComponent,
    ProductDetaialsComponent,
    ProductAdvertsComponent
  
  ],
  imports: [
    CommonModule,
    ProdsharemodModule,
    ProdshopmodRoutingModule,
    CarouselModule
  ],
  exports :[ProdshopmodComponent,
    ProductDetaialsComponent
   
  ]
})
export class ProdshopmodModule { }
