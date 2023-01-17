import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProdshopmodComponent } from './prodshopmod.component';
import { ProdsharemodModule } from '../prodsharemod/prodsharemod.module';
import { ProductItemChildComponent } from './product-item-child.component';
import { RouterModule } from '@angular/router';
import { ProductDetaialsComponent } from './product-detaials/product-detaials.component';
import { ProdshopmodRoutingModule } from './prodshopmod-routing.module';



@NgModule({
  declarations: [
    ProdshopmodComponent,
    ProductItemChildComponent,
    ProductDetaialsComponent
  
  ],
  imports: [
    CommonModule,
    ProdsharemodModule,
    ProdshopmodRoutingModule
  ],
  exports :[ProdshopmodComponent,
    ProductDetaialsComponent
   
  ]
})
export class ProdshopmodModule { }
