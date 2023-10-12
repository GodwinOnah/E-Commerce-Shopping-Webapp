import { Injectable } from '@angular/core';
import { IProductPagination } from '../prodsharemod/models/IProductPagination';
import { HttpClient,HttpParams } from '@angular/common/http';
import { IBrands } from '../prodsharemod/models/IBrands';
import { IProductTypes } from '../prodsharemod/models/IProductTypes';
import { map, Observable, of } from 'rxjs';
import { ShopParameters } from '../prodsharemod/models/shopParameters';
import { IProduct } from '../prodsharemod/models/IProduct';
import { IAdverts } from '../prodsharemod/models/IAdverts';
import { environment } from 'environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ProdshopmodService {
  url = environment.apiUrl;
  products : IProduct[]=[];
  brands : IBrands[] = [];
  types : IProductTypes[]=[];
  pagination? :IProductPagination<IProduct[]>;
  shopParams = new ShopParameters();
  cashe = new Map<string,IProductPagination<IProduct[]>>();
  

  constructor(private http: HttpClient) {
   }

  getProducts(useCashe=true): Observable<IProductPagination<IProduct[]>>{
   
    if(!useCashe) this.cashe = new Map();
    if(this.cashe.size > 0 && useCashe){
      if(this.cashe.has(Object.values(this.shopParams).join('-'))){
        this.pagination = this.cashe.get(Object.values(this.shopParams).join('-'));
        if(this.pagination)return of(this.pagination);
      }
    }

    let params = new HttpParams();

      if(this.shopParams.brandId!== 0)
      params = params.append('brandId',this.shopParams.brandId.toString())

      if(this.shopParams.typeId !== 0)
      params = params.append('typeId',this.shopParams.typeId.toString())

      if(this.shopParams.search)
      params = params.append('search',this.shopParams.search)

      params = params.append('sort',this.shopParams.sort)
      params = params.append('pageIndex',this.shopParams.pageNumber.toString())
      params = params.append('pageSize',this.shopParams.pageSize.toString())
   
      return this.http.get<IProductPagination<IProduct[]>>
    (this.url+'prod',{params})
    .pipe(map(
      response =>{ 
        this.cashe.set(Object.values(this.shopParams).join('-'),response);
        this.pagination = response;
        return response;
        }
      ))
   }

   setShopParams(params:ShopParameters){
    this.shopParams = params;
   }

   getShopParams(){
    return this.shopParams;
   }

   getProduct(id:number){
    const product = [...this.cashe.values()].reduce((accumulator,paginationResult)=>{
      return { ...accumulator,...paginationResult.data
        .find( x => x.id == id)
      }}, {} as IProduct)
    if(Object.keys(product).length !== 0) return of(product);
    return this.http.get<IProduct>(this.url+'prod/'+id)
   }

   getBrands(){
    if(this.brands.length>0) return of(this.brands);
    return this.http.get<IBrands[]>(this.url+'prod/brands').pipe(map(
      brands =>
        this.brands=brands  
      ))
   }

   getProductTypes(){
    if(this.types.length>0) return of(this.types);
    return this.http.get<IProductTypes[]>(this.url+'prod/types').pipe(map(
      types =>
        this.types=types 
      ))}

  UploadProduct(value:any){
    return this.http.post<string>(this.url+'prod',value);   
}

  saveProductPicture(formData:any){
    return this.http.post(this.url+'prod/savePicture',formData);
}

  UploadBrand(id:number,value:any){
  var brand = {
    id:id,
    Name:value
  }
  return this.http.post<string>(this.url+'productBrand',brand);
}

  UploadType(id:number,value:any){
  var type = {
    id:id,
    Name:value
  }
  return this.http.post<string>(this.url+'productType',type);
}

  DeleteProduct(id:number){
  return this.http.delete(this.url+'prod/'+id); 
}

 GetAdverts(){
  return this.http.get<IAdverts[]>(this.url+'advert'); 
}
}

