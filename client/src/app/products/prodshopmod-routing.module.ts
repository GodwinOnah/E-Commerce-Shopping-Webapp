import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ProdshopmodComponent } from './prodshopmod.component';
import { ProductDetaialsComponent } from './product-detaials/product-detaials.component';

const routes: Routes =[

{path:'', component:ProdshopmodComponent},
{path:':productId', component:ProductDetaialsComponent,data:{breadcrumb:{alias:'productName'}}}
]

@NgModule({
  declarations: [],
  imports: [
  RouterModule.forChild(routes)
  ],
  exports:[RouterModule]

})
export class ProdshopmodRoutingModule { }
