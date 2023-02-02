import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { NotFoundComponent } from './core/ErrorHandlers/not-found/not-found.component';
import { ServerErrorComponent } from './core/ErrorHandlers/server-error/server-error.component';
import { HomePageComponent } from './home-page/home-page.component';

const routes: Routes = [
      {path:'', component:HomePageComponent,data:{breadcrumb:'Home'}},
      {path:'prodshopmod', loadChildren: ()=>import('./prodshopmod/prodshopmod.module').then(mod=>mod.ProdshopmodModule),data:{breadcrumb:'Products'}},
      // {path:'**', redirectTo: '',pathMatch:'full'},
      {path:'not-found', component:NotFoundComponent},
      {path:'server-error', component:ServerErrorComponent},
      {path:'Checkout', loadChildren: ()=>import('./Checkout/Checkout.module').then(mod=>mod.CheckoutModule),data:{breadcrumb:'Checkout'}},
      {path:'basket', loadChildren: ()=>import('./basket/basket.module').then(mod=>mod.BasketModule),data:{breadcrumb:'My Orders'}},
  ];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
