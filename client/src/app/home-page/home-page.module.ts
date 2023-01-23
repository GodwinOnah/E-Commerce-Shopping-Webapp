import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HomePageComponent } from './home-page.component';
import { ProdshopmodModule } from '../prodshopmod/prodshopmod.module';
import { RouterModule } from '@angular/router';



@NgModule({
  declarations: [
    HomePageComponent
  ],
  imports: [
    CommonModule,
    ProdshopmodModule

  ],
  exports: [HomePageComponent]
})
export class HomePageModule { }
