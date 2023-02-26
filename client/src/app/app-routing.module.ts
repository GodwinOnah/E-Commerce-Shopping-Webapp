import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { NotFoundComponent } from './core/ErrorHandlers/not-found/not-found.component';
import { ServerErrorComponent } from './core/ErrorHandlers/server-error/server-error.component';
import { GuardsGuard } from './core/guards.guard';
import { HomePageComponent } from './home-page/home-page.component';

const routes: Routes = [
      {path:'', component:HomePageComponent,data:{breadcrumb:'Home'}},
      {path:'products', loadChildren: ()=>import('./products/prodshopmod.module').then(mod=>mod.ProdshopmodModule),data:{breadcrumb:'Products'}},
      // {path:'**', redirectTo: '',pathMatch:'full'},
      {path:'not-found', component:NotFoundComponent},
      {path:'server-error', component:ServerErrorComponent},
      {path:'Checkout', canActivate:[GuardsGuard], loadChildren: ()=>import('./Checkout/Checkout.module').then(mod=>mod.CheckoutModule),data:{breadcrumb:'Checkout'}},
      {path:'orders', canActivate:[GuardsGuard], loadChildren: ()=>import('./Orders/orders.module').then(mod=>mod.OrdersModule),data:{breadcrumb:'Orders'}},
      {path:'account', loadChildren: ()=>import('./Account/account.module').then(mod=>mod.UserAccountModule),data:{breadcrumb:'User Account'}},
      {path:'basket', loadChildren: ()=>import('./basket/basket.module').then(mod=>mod.BasketModule),data:{breadcrumb:'Basket'}},
  ];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
