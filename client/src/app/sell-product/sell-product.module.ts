import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SellProductComponent } from './sell-product.component';
import { SellProductRoutingModule } from './sell-product-routing.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';



@NgModule({
  declarations: [SellProductComponent],
  imports: [
    CommonModule,
    SellProductRoutingModule,
    ReactiveFormsModule,
    FormsModule,

  ],
  exports :[SellProductComponent]
})
export class SellProductModule { }
