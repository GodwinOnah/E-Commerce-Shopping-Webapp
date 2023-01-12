import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import {IProduct}  from './models/IProduct';
import { IProductPagination } from './models/IProductPagination';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit{
  
  title = 'BagShop';

  product: IProduct[];

  constructor(private http: HttpClient){

  }

  ngOnInit(): void {
    this.http.get('https://localhost:7135/products').subscribe((response:IProductPagination)=>{
      console.log(response);

    },error=>{console.log(error)}
  )};
}
