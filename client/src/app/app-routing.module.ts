import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomePageComponent } from './home-page/home-page.component';

const routes: Routes = [
      {path:'', component:HomePageComponent,data:{breadcrumb:'Home'}},
      {path:'prodshopmod', loadChildren: ()=>import('./prodshopmod/prodshopmod.module').then(mod=>mod.ProdshopmodModule),data:{breadcrumb:'Products'}},
      {path:'**', redirectTo: '',pathMatch:'full'},
      {path:'basket', loadChildren: ()=>import('./basket/basket.module').then(mod=>mod.BasketModule),data:{breadcrumb:'Basket'}},
  ];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
