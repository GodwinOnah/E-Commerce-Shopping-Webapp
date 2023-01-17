import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProdshopmodComponent } from './prodshopmod.component';
import { ProdsharemodModule } from '../prodsharemod/prodsharemod.module';
import { ProductItemChildComponent } from './product-item-child.component';
import { RouterModule } from '@angular/router';
import { ProductDetaialsComponent } from './product-detaials/product-detaials.component';



@NgModule({
  declarations: [
    ProdshopmodComponent,
    ProductItemChildComponent,
    ProductDetaialsComponent
  
  ],
  imports: [
    CommonModule,
    ProdsharemodModule,
    RouterModule
  ],
  exports :[ProdshopmodComponent,
    ProductDetaialsComponent
   
  ]
})
export class ProdshopmodModule { }
