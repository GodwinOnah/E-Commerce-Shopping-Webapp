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
import { StepperComponent } from './components/stepper/stepper.component';
import {  CdkStepperModule } from '@angular/cdk/stepper';


@NgModule({
  declarations: [
    PageAnalyserComponent,
    PaginationSharedComponetComponent,
    OrderTotalComponent,
    TextInputsComponent,
    StepperComponent
  ],
  imports: [
    CommonModule,
    PaginationModule.forRoot(),
    CarouselModule.forRoot(),
    ReactiveFormsModule,
    BsDropdownModule.forRoot(),
    CdkStepperModule
  ],
  exports: [PaginationModule,
    PageAnalyserComponent,
    PaginationSharedComponetComponent,
    CarouselModule,
    OrderTotalComponent,
    ReactiveFormsModule,
    BsDropdownModule,
    TextInputsComponent,
    StepperComponent,
    CdkStepperModule
    
  ]
})
export class ProdsharemodModule { }
