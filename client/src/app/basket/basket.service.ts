import { HttpClient } from '@angular/common/http';
import {Injectable } from '@angular/core';
import { BehaviorSubject, map } from 'rxjs';
import { environment } from 'src/environment/environment';
import { Basket, IBasket, IBasketItem, TotalBasketPrice } from '../prodsharemod/models/IBasket';
import { IProduct } from '../prodsharemod/models/IProduct';

@Injectable({
  providedIn: 'root'
})


export class BasketService {
  baseUrl = environment.apiUrl;
  private basketSource = new BehaviorSubject<IBasket|null>(null);
  private totalBasketPriceSource = new BehaviorSubject<TotalBasketPrice|null>(null);
  basket$  = this.basketSource.asObservable();
  totalBasketPrice$  = this.totalBasketPriceSource.asObservable();

  constructor(private http:HttpClient) {

   }


  GetBasket(id:string){
  return this.http.get<Basket>(this.baseUrl+'basket?id='+id).subscribe({
    next: basket =>{
      this.basketSource.next(basket);
      this.TotalBasketValue();
      
    }
    //updates basket with new values
    
  });
  }

SetBasket(basket:IBasket){
  console.log(basket)
    return this.http.post<Basket>(this.baseUrl+'basket',basket).subscribe({
      next: basket =>{
        this.basketSource.next(basket);
        this.TotalBasketValue();
        
      }
      //updates basket with new values
      
    }
    );    
}

CurrentBasket(){
  return this.basketSource.value;
}

private TotalBasketValue(){

  const basket=this.CurrentBasket();
  if(!basket)return;
  const delivery=0
  const total=basket.items.reduce((sum,item)=>item.prodPrice*item.quantity+sum,0)
  const overallTotal=total+delivery;
  this.totalBasketPriceSource.next({overallTotal,delivery,total})
}

AddItemsToBasket(item:IProduct,quantity){
  const itemToAdd:IBasketItem = this.MapBasketToBasketItem(item,quantity);
  const basket = this.CurrentBasket()??this.CreateBasket();
  basket.items = this.AddOrUpdate(basket.items,itemToAdd,quantity);
  this.SetBasket(basket);
}

private AddOrUpdate(items: IBasketItem[], itemToAdd: IBasketItem, quantity: number): IBasketItem[] {
    const index=items.findIndex(index=>index.productId===itemToAdd.productId);
    if(index==-1){
      itemToAdd.quantity=quantity;
      items.push(itemToAdd);
    }
      else{ items[index].quantity+=quantity;}

    return items;

  }

private CreateBasket(): IBasket {
    const basket=new Basket();
    localStorage.setItem('basket_id',basket.id);//computer local storage set this id for load after refereshing or return back  
    return basket;
  }

private MapBasketToBasketItem(item: IProduct, quantity: number): IBasketItem {
  
  return {
    productId: item.productId,
    prodName: item.prodName,
    prodPrice: item.prodPrice,
    quantity,
    prodPicture: item.prodPicture,
    productBrand: item.productBrand,
    productType: item.productType
  }
}

}
