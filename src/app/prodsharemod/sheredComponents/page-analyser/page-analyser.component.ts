import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-page-analyser',
  templateUrl: './page-analyser.component.html',
  styleUrls: ['./page-analyser.component.scss']
})
export class PageAnalyserComponent {

  @Input() pageNumber:number;
  @Input() pageSize:number;
  @Input() totalPageNumber:number;

}
