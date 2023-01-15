import { Injectable } from '@angular/core';
import { IProductPagination } from '../prodsharemod/models/IProductPagination';
import { HttpClient, HttpParams } from '@angular/common/http';
import { IBrands } from '../prodsharemod/models/IBrands';
import { IProductTypes } from '../prodsharemod/models/IProductTypes';
import { map } from 'rxjs';
@Injectable({
  providedIn: 'root'
})
export class ProdshopmodService {

  url='https://localhost:7135/';
  

  constructor(private http: HttpClient) {
   }

   getProducts(brandId?:number,typeId?:number){

    let params=new HttpParams();

    if(brandId){
      params=params.append('brandId',brandId.toString())

    }

    if(typeId){
      params=params.append('typeId',typeId.toString())

    }

    return this.http.get<IProductPagination>
    (this.url+'products',{observe:'response',params})
    .pipe(map(
      response=> response.body)
    )
   }

   getBrands(){

    return this.http.get<IBrands[]>(this.url+"products/brands")
   }

   getProductTypes(){

    return this.http.get<IProductTypes[]>(this.url+"products/types")
   }
}
