import { HttpClient, HttpHeaders } from '@angular/common/http';
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
    const token = localStorage.getItem('token');
    let headers = new HttpHeaders();
    headers = headers.set('Authorization', `Bearer ${token}`);
    return this.http.get<IOrders[]>(this.baseUrl+'order',{headers})
  }

  GetOrdersById(id:number){
    const token = localStorage.getItem('token');
    let headers = new HttpHeaders();
    headers = headers.set('Authorization', `Bearer ${token}`);
    return this.http.get<IOrders>(this.baseUrl+'order/'+id,{headers})
  }
}