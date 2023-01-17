import { Injectable } from '@angular/core';
import { IProductPagination } from '../prodsharemod/models/IProductPagination';
import { HttpClient, HttpParams } from '@angular/common/http';
import { IBrands } from '../prodsharemod/models/IBrands';
import { IProductTypes } from '../prodsharemod/models/IProductTypes';
import { map } from 'rxjs';
import { ShopParameters } from '../prodsharemod/models/shopParameters';
import { IProduct } from '../prodsharemod/models/IProduct';
@Injectable({
  providedIn: 'root'
})
export class ProdshopmodService {

  url='https://localhost:7135/';
  

  constructor(private http: HttpClient) {
   }

   getProducts(shopParameters:ShopParameters){

    let params=new HttpParams();

    if(shopParameters.brandId!=0){
      params=params.append('brandId',shopParameters.brandId.toString())

    }

    if(shopParameters.typeId!=0){
      params=params.append('typeId',shopParameters.typeId.toString())
 
    }


    if(shopParameters.search){
      params=params.append('search',shopParameters.search)

    }

      params=params.append('sort',shopParameters.sort)
      params=params.append('pageIndex',shopParameters.pageNumber.toString())
      params=params.append('pageIndex',shopParameters.pageSize.toString())
      
    

    return this.http.get<IProductPagination>
    (this.url+'products',{observe:'response',params})
    .pipe(map(
      response=> response.body)
    )
   }

   getProduct(productId:number){

    return this.http.get<IProduct>(this.url+"products/"+productId)
   }

   getBrands(){

    return this.http.get<IBrands[]>(this.url+"products/brands")
   }

   getProductTypes(){

    return this.http.get<IProductTypes[]>(this.url+"products/types")
   }
}
