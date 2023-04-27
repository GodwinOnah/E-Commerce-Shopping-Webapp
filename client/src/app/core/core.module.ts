import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NavBarComponent } from './nav-bar/nav-bar.component';
import { Router, RouterModule } from '@angular/router';
import { PageSectionHeaderComponent } from './page-section-header/page-section-header.component';
import { BreadcrumbModule } from 'xng-breadcrumb';
import { NotFoundComponent } from './ErrorHandlers/not-found/not-found.component';
import { ServerErrorComponent } from './ErrorHandlers/server-error/server-error.component';
import {ToastrModule} from 'ngx-toastr'
import { ProdshopmodModule } from '../products/prodshopmod.module';
import { ProdsharemodModule } from '../prodsharemod/prodsharemod.module';
import { MatDialogModule } from '@angular/material/dialog';



@NgModule({
  declarations: [NavBarComponent, PageSectionHeaderComponent, NotFoundComponent, ServerErrorComponent],
  imports: [
    CommonModule,
    RouterModule,
   ProdsharemodModule,
    BreadcrumbModule,
    MatDialogModule,
    ToastrModule.forRoot({
                      positionClass:'toast-top',
                      preventDuplicates:true
    })
  ],
  exports : [NavBarComponent,PageSectionHeaderComponent,BreadcrumbModule
  ]
})
export class CoreModule { }
