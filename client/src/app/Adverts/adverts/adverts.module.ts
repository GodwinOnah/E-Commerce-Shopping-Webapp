import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { UserAccountModule } from 'src/app/Account/account.module';
import { TextInputsComponent } from 'src/app/Account/text-inputs/text-inputs.component';
import { ProdshopmodModule } from 'src/app/products/prodshopmod.module';



@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    ProdshopmodModule
    
    
  ]
})
export class AdvertsModule { }
