import { HttpClient } from '@angular/common/http';
import { isNgTemplate } from '@angular/compiler';
import {Injectable, OnInit } from '@angular/core';
import { BehaviorSubject, map } from 'rxjs';
import { environment } from 'src/environments/environment';
import { CheckoutServiceService } from '../Checkout/checkout-service.service';
import { Basket, IBasket, IBasketItem, TotalBasketPrice } from '../prodsharemod/models/IBasket';
import { IDelivery } from '../prodsharemod/models/IDelivery';
import { IProduct } from '../prodsharemod/models/IProduct';

@Injectable({
  providedIn: 'root'
})


export class BasketService{
  baseUrl = environment.apiUrl;
  private basketSource = new BehaviorSubject<IBasket|null>(null);
  private totalBasketPriceSource = new BehaviorSubject<TotalBasketPrice|null>(null);
  basket$  = this.basketSource.asObservable();
  totalBasketPriceSource$  = this.totalBasketPriceSource.asObservable();
  delivery:IDelivery[] =[];
 

  constructor(private http : HttpClient) {
   }
  
  GetBasket(id:string){
    return this.http.get<IBasket>(this.baseUrl+'basket?id='+id).subscribe({
    next: basket =>{
      this.basketSource.next(basket);
      this.TotalBasketValue();     
    }  
  });
  }

SetBasket(basket:IBasket){
    return this.http.post<IBasket>(this.baseUrl+'basket',basket).subscribe({
      next: basket =>{
        this.basketSource.next(basket);
        this.TotalBasketValue();    
      }
    }
    );    
}

CurrentBasket(){
  return this.basketSource.value;
}

private TotalBasketValue(){
  const basket = this.CurrentBasket();
  if(!basket)return;
  const subTotal = basket.items.reduce((sum,item) => item.prodPrice*item.quantity+sum,0);
  const total = subTotal+Number(basket.deliveryPrice);
  this.totalBasketPriceSource.next({shippingPrice:basket.deliveryPrice,subTotal,total})
}

AddItemsToBasket(item:IProduct|IBasketItem,quantity = 1){
  if(this.isProduct(item)) item = this.MapBasketToBasketItem(item);
  const basket = this.CurrentBasket()??this.CreateBasket();
  basket.items = this.AddOrUpdate(basket.items,item,quantity);
  this.SetBasket(basket);
}

RemoveItemsFromBasket(id:number,quantity?:number){
        const basket = this.CurrentBasket();
        if(!basket) return;
        const item = basket.items.find(index => index.id === id);//finding item 
        if(item.quantity<0)return;
        if(item){
            item.quantity -= quantity;
            if(item.quantity === 0)
            basket.items = basket.items.filter(index => index.id != id);
            if(basket.items.length>0) 
            this.SetBasket(basket);
            else{this.DeleteBasket(basket)}
        }
}

DeleteBasket(basket: IBasket) {
    return this.http.delete(this.baseUrl+'basket?id='+basket.id).subscribe({
      next:() =>{
        this.RemoveAllItemsInBasket();
  }});
  }

RemoveAllItemsInBasket(){
  this.basketSource.next(null);
  this.totalBasketPriceSource.next(null);
  localStorage.removeItem('basket_id')  
}

private AddOrUpdate(items: IBasketItem[], itemToAdd: IBasketItem, quantity: number): IBasketItem[] {    
  const item = items.find(index=>index.id === itemToAdd.id);//finding item index
    if(item)item.quantity += quantity;
     else{ itemToAdd.quantity = quantity;
      items.push(itemToAdd);
     }
    return items;
  }

private CreateBasket(): IBasket {
    const basket = new Basket();
    basket.deliveryPrice = 1;
    localStorage.setItem('basket_id',basket.id);//computer local storage set this id for load after refereshing or return back  
    return basket;
  }

private MapBasketToBasketItem(item: IProduct): IBasketItem {  
  return {
    id: item.id,
    prodName: item.prodName,
    prodPrice: item.prodPrice,
    quantity:0,
    prodPicture: item.prodPicture,
    productBrand: item.productBrand,
    productType: item.productType
  }
}

private isProduct(item:IProduct|IBasketItem):item is IProduct{
return (item as IProduct).productBrand != undefined;
}

SetDelivery(delivery:IDelivery){
  const basket = this.CurrentBasket();
  if(basket){
     basket.deliveryPrice = delivery.delPrice;
     basket.deliveryId = delivery.id; 
     basket.deliveryName = delivery.delName ;
     basket.deliveryTime = delivery.delTime;
     basket.deliveryDescription = delivery.delDescription;
     this.SetBasket(basket);
}
}

CreatePaymentIntent(){
  return this.http.post<IBasket>(this.baseUrl+'payment/'+this.CurrentBasket()?.id,{}).pipe(map(
     basket =>{
      this.basketSource.next(basket);    
    } 
  ));}
}
