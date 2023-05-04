import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, map } from 'rxjs';
import { environment } from 'src/environments/environment';
import { IOrders } from '../prodsharemod/models/IOrders';

@Injectable({
  providedIn: 'root'
})
export class OrdersService {

  baseUrl = environment.apiUrl;
  private orderSource = new BehaviorSubject<IOrders|null>(null);
  orders$  = this.orderSource.asObservable();

  constructor(private http:HttpClient) { }

  GetOrders(){
    return this.http.get<IOrders[]>(this.baseUrl+'order')
  }

  GetOrdersById(id:number){
    return this.http.get<IOrders>(this.baseUrl+'order/'+id)
  }
}