import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { SellProductComponent } from './sell-product.component';

const routes: Routes =[
  {path:'', component:SellProductComponent}
]

@NgModule({
  declarations: [],
  imports: [
    RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class SellProductRoutingModule { }
