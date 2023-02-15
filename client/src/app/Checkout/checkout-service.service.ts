import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map } from 'rxjs';
import { environment } from 'src/environment/environment';
import { IDelivery } from '../prodsharemod/models/IDelivery';

@Injectable({
  providedIn: 'root'
})
export class CheckoutServiceService {

  baseUrl = environment.apiUrl;

  constructor(private http:HttpClient) { }

  GetDeliveryMethod(){
    return this.http.get<IDelivery[]>(this.baseUrl+'order/delivery').pipe(map(
      delivery =>{
        return delivery.sort((a,b)=>b.DelPrice-a.DelPrice)
        
      }
    ))
}}
