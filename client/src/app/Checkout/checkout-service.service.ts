import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Address } from '@stripe/stripe-js';
import { map } from 'rxjs';
import { environment } from 'src/environments/environment';
import { IDelivery } from '../prodsharemod/models/IDelivery';
import { IOrders } from '../prodsharemod/models/IOrders';
import { IOrderToCreate } from '../prodsharemod/models/IOrderToCreate';

@Injectable({
  providedIn: 'root'
})
export class CheckoutServiceService {

  baseUrl = environment.apiUrl;
  constructor(private http:HttpClient) { }

  CreateAnOrder(order:IOrderToCreate){
    const token = localStorage.getItem('token');
    let headers = new HttpHeaders();
    headers = headers.set('Authorization', `Bearer ${token}`);
     return this.http.post<IOrders>(this.baseUrl+'order',order,{headers});
  }

  GetDelivery(){
    return this.http.get<IDelivery[]>(this.baseUrl+'order/delivery').pipe(map(
      delivery =>{
        return delivery.sort((a,b)=>b.delPrice-a.delPrice)   
      }
    ))
}}
