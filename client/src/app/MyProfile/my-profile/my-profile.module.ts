import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { MyProfileComponent } from './my-profile.component';



@NgModule({
  declarations: [MyProfileComponent],
  imports: [
    CommonModule,
    RouterModule
  ],
  exports: [MyProfileComponent]
})
export class MyProfileModule { }
