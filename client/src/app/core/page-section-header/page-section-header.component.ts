import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { BreadcrumbService } from 'xng-breadcrumb';
import { Breadcrumb } from 'xng-breadcrumb/lib/types/breadcrumb';

@Component({
  selector: 'app-page-section-header',
  templateUrl: './page-section-header.component.html',
  styleUrls: ['./page-section-header.component.scss']
})
export class PageSectionHeaderComponent implements OnInit{

  breadcrumb$:Observable<any>;

  constructor(private breadcrumbService: BreadcrumbService){


  }
  ngOnInit(): void {

   this. breadcrumb$ = this.breadcrumbService.breadcrumbs$
   
  }

}
