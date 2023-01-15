import { Component, Input, OnInit } from '@angular/core';
import { IProduct } from '../prodsharemod/models/IProduct';

@Component({
  selector: 'app-product-item-child',
  templateUrl: './product-item-child.component.html',
  styleUrls: ['./product-item-child.component.scss']
})
export class ProductItemChildComponent implements OnInit{
  
  @Input() product: IProduct;

  constructor(){
  }

  ngOnInit(): void {
    
  }

}
