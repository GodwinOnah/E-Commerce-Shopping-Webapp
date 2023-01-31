import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NavBarComponent } from './nav-bar/nav-bar.component';
import { Router, RouterModule } from '@angular/router';
import { PageSectionHeaderComponent } from './page-section-header/page-section-header.component';
import { BreadcrumbModule } from 'xng-breadcrumb';
import { NotFoundComponent } from './ErrorHandlers/not-found/not-found.component';
import { ServerErrorComponent } from './ErrorHandlers/server-error/server-error.component';
import {ToastrModule} from 'ngx-toastr'



@NgModule({
  declarations: [NavBarComponent, PageSectionHeaderComponent, NotFoundComponent, ServerErrorComponent],
  imports: [
    CommonModule,
    RouterModule,
    BreadcrumbModule,
    ToastrModule.forRoot({
      positionClass:'toast-top',
      preventDuplicates:true
    })
  ],
  exports : [NavBarComponent,PageSectionHeaderComponent]
})
export class CoreModule { }
