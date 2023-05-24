import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, map } from 'rxjs';
import { environment } from 'src/environments/environment';
import { IAdminOrder } from '../prodsharemod/models/IAdminOrder';
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

  GetAdminOrders(){
    return this.http.get<IAdminOrder[]>(this.baseUrl+'admin')
  }

  GetOrdersById(id:number){
    const token = localStorage.getItem('token');
    let headers = new HttpHeaders();
    headers = headers.set('Authorization', `Bearer ${token}`);
    return this.http.get<IOrders>(this.baseUrl+'order/'+id,{headers})
  }

  GetAdminOrdersById(id:number){
    return this.http.get<IAdminOrder>(this.baseUrl+'admin/'+id)
  }

  DeleteAdminOrder(id){
    return this.http.delete(this.baseUrl+'admin/'+id)
  }

  // DeletPaidOrder(id: number) {
  //   return this.http.delete(this.baseUrl+'admin?id='+basket.id).subscribe({
  //     next:() =>{
  //       this.RemoveAllItemsInBasket();
  // }});
  // }
}