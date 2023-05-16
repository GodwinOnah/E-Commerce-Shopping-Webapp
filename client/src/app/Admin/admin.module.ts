import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AdminComponent } from '../admin/admin.component';
import { AdminRoutingModule } from './admin-routing.module';
import { ProdshopmodModule } from '../products/prodshopmod.module';
import { MatDialogModule } from '@angular/material/dialog';



@NgModule({
  declarations: [
    AdminComponent
  ],
  imports: [
    CommonModule,
    AdminRoutingModule,
    ProdshopmodModule,
    MatDialogModule
  ]
})
export class AdminModule { }
