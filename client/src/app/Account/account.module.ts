import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UserAccountRoutingModule } from './user-account-routing.module';
import { ProdsharemodModule } from '../prodsharemod/prodsharemod.module';
import { ReactiveFormsModule } from '@angular/forms';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './Register/register.component';
import {  MatDialogModule } from '@angular/material/dialog';
import { ForgotpasswrdComponent } from './forgot_password/forgotpasswrd/forgotpasswrd.component';
import { AdvertsComponent } from '../Adverts/adverts/adverts.component';
import { TextInputsComponent } from './text-inputs/text-inputs.component';




@NgModule({
  declarations: [
    LoginComponent,
    RegisterComponent,
    ForgotpasswrdComponent,
    AdvertsComponent
   
   ],
  imports: [
    CommonModule,
    UserAccountRoutingModule,
    ReactiveFormsModule,
    ProdsharemodModule,
    MatDialogModule
  ],
  exports :[TextInputsComponent]
})
export class UserAccountModule {}
