import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {PaginationModule } from 'ngx-bootstrap/pagination';
import {CarouselModule} from 'ngx-bootstrap/carousel';
import { PageAnalyserComponent } from './sheredComponents/page-analyser/page-analyser.component';
import { PaginationSharedComponetComponent } from './sheredComponents/pagination-shared-componet/pagination-shared-componet.component';
import { OrderTotalComponent } from './order-total/order-total.component';
import { ReactiveFormsModule } from '@angular/forms';
import { BsDropdownModule } from 'ngx-bootstrap/dropdown';
import { TextInputsComponent } from './components/text-inputs/text-inputs.component';



@NgModule({
  declarations: [
    PageAnalyserComponent,
    PaginationSharedComponetComponent,
    OrderTotalComponent,
    TextInputsComponent
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
    OrderTotalComponent,
    ReactiveFormsModule,
    BsDropdownModule,
    TextInputsComponent
  ]
})
export class ProdsharemodModule { }
