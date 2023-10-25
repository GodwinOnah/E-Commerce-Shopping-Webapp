import { Component,EventEmitter,Input, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-pagination-shared-componet',
  templateUrl: './pagination-shared-componet.component.html',
  styleUrls: ['./pagination-shared-componet.component.scss']
})
export class PaginationSharedComponetComponent implements OnInit{

  constructor(){}

  ngOnInit(): void {
    
  }
  @Input() pageSize?:number;
  @Input() pageNumber?:number;
  @Input() totalPageNumber?:number;
  @Output() pageChange=new EventEmitter<number>();

  sharedPageChange(event:any){

    this.pageChange.emit(event.page);
  }

}
