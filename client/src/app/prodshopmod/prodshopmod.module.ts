import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProdshopmodComponent } from './prodshopmod.component';
import { ProductItemChildComponent } from './product-item-child.component';


@NgModule({
  declarations: [
    ProdshopmodComponent,
    ProductItemChildComponent
  ],
  imports: [
    CommonModule
  ],
  exports :[ProdshopmodComponent 
  ]
})
export class ProdshopmodModule { }
