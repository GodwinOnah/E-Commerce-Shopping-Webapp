import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NavBarComponent } from './nav-bar/nav-bar.component';
import { RouterModule } from '@angular/router';
import { PageSectionHeaderComponent } from './page-section-header/page-section-header.component';
import { BreadcrumbModule } from 'xng-breadcrumb';
import { NotFoundComponent } from './ErrorHandlers/not-found/not-found.component';
import { ServerErrorComponent } from './ErrorHandlers/server-error/server-error.component';
import {ToastrModule} from 'ngx-toastr'
import { ProdsharemodModule } from '../prodsharemod/prodsharemod.module';
import { MatDialogModule } from '@angular/material/dialog';
import { FooterComponent } from './footer/footer.component';



@NgModule({
  declarations: [NavBarComponent, PageSectionHeaderComponent, NotFoundComponent, ServerErrorComponent, FooterComponent],
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
  exports : [NavBarComponent,PageSectionHeaderComponent,BreadcrumbModule,FooterComponent]
})
export class CoreModule { }
