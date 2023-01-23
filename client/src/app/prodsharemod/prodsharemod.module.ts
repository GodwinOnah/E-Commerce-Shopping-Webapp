import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {PaginationModule } from 'ngx-bootstrap/pagination';
import {CarouselModule} from 'ngx-bootstrap/carousel';
//import {SlidelModule} from 'ngx-bootstrap/materials/slide';
import { PageAnalyserComponent } from './sheredComponents/page-analyser/page-analyser.component';
import { PaginationSharedComponetComponent } from './sheredComponents/pagination-shared-componet/pagination-shared-componet.component';



@NgModule({
  declarations: [
    PageAnalyserComponent,
    PaginationSharedComponetComponent
  ],
  imports: [
    CommonModule,
    PaginationModule.forRoot(),
    CarouselModule.forRoot()
    //SlidelModule
  ],
  exports: [PaginationModule,
    PageAnalyserComponent,
    PaginationSharedComponetComponent,
    CarouselModule
  ]
})
export class ProdsharemodModule { }
