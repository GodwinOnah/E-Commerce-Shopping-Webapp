import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HomePageComponent } from './home-page.component';
import { CarouselModule } from 'ngx-bootstrap/carousel';





@NgModule({
  declarations: [
    HomePageComponent
  ],
  imports: [
    CommonModule,
    CarouselModule
  ],
  exports: [HomePageComponent]
})
export class HomePageModule { }
