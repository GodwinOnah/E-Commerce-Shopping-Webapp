import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UserAccountRoutingModule } from './account-routing.module';
import { ProdsharemodModule } from '../prodsharemod/prodsharemod.module';
import { ReactiveFormsModule } from '@angular/forms';



@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    UserAccountRoutingModule,
    ReactiveFormsModule
  ]
})
export class UserAccountModule { }
