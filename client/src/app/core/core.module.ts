import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NavBarComponent } from './nav-bar/nav-bar.component';
import { Router, RouterModule } from '@angular/router';
import { PageSectionHeaderComponent } from './page-section-header/page-section-header.component';
import { BreadcrumbModule } from 'xng-breadcrumb';




@NgModule({
  declarations: [NavBarComponent, PageSectionHeaderComponent],
  imports: [
    CommonModule,
    RouterModule,
    BreadcrumbModule
  ],
  exports : [NavBarComponent,PageSectionHeaderComponent]
})
export class CoreModule { }
