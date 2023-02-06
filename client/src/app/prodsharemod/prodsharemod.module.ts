import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {PaginationModule } from 'ngx-bootstrap/pagination';
import {CarouselModule} from 'ngx-bootstrap/carousel';
import { PageAnalyserComponent } from './sheredComponents/page-analyser/page-analyser.component';
import { PaginationSharedComponetComponent } from './sheredComponents/pagination-shared-componet/pagination-shared-componet.component';
import { OrderToatalComponent } from './order-toatal/order-toatal.component';
import { ReactiveFormsModule } from '@angular/forms';
import { BsDropdownModule } from 'ngx-bootstrap/dropdown';



@NgModule({
  declarations: [
    PageAnalyserComponent,
    PaginationSharedComponetComponent,
    OrderToatalComponent
  ],
  imports: [
    CommonModule,
    PaginationModule.forRoot(),
    CarouselModule.forRoot(),
    ReactiveFormsModule,
    BsDropdownModule.forRoot()
  ],
  exports: [PaginationModule,
    PageAnalyserComponent,
    PaginationSharedComponetComponent,
    CarouselModule,
    OrderToatalComponent,
    ReactiveFormsModule,
    BsDropdownModule
  ]
})
export class ProdsharemodModule { }
