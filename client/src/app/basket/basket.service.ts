import { HttpClient } from '@angular/common/http';
import {Injectable } from '@angular/core';
import { BehaviorSubject, map } from 'rxjs';
import { environment } from 'src/environment/environment';
import { Basket, IBasket, IBasketItem } from '../prodsharemod/models/IBasket';
import { IProduct } from '../prodsharemod/models/IProduct';

@Injectable({
  providedIn: 'root'
})


export class BasketService {
  baseUrl = environment.apiUrl;
  private basketSource = new BehaviorSubject<IBasket>(null);
  basket$  = this.basketSource.asObservable();
  constructor(private http:HttpClient) { }



  GetBasket(id:string){
  return this.http.get(this.baseUrl+'basket?id='+id)
      .pipe(
        map((basket:IBasket)=>{
          this.basketSource.next(basket);
        })
      )   
  }

SetBasket(basket:IBasket){
    return this.http.post(this.baseUrl+'basket',basket).subscribe((response:IBasket)=>{
      this.basketSource.next(response);//updates basket with new values
    },error=>{console.log(error)}
    );    
}

CurrentBasket(){
  return this.basketSource.value;
}

AddItemsToBasket(item:IProduct,quantity){
  const itemToAdd:IBasketItem = this.MapBasketToBasketItem(item,quantity);
  const basket = this.CurrentBasket()??this.CreateBasket();
  basket.items = this.AddOrUpdate(basket.items,itemToAdd,quantity);
  this.SetBasket(basket);
}

private AddOrUpdate(items: IBasketItem[], itemToAdd: IBasketItem, quantity: number): IBasketItem[] {
    const index=items.findIndex(index=>index.itemId===itemToAdd.itemId);
    if(index==-1){
      itemToAdd.itemQuantity=quantity;
      items.push(itemToAdd);
    }
      else{ items[index].itemQuantity+=quantity;}

    return items;

  }

private CreateBasket(): IBasket {
    const basket=new Basket();
    localStorage.setItem('basket_id',basket.id);//computer local storage set this id for load after refereshing or return back  
    return basket;
  }

private MapBasketToBasketItem(item: IProduct, quantity: number): IBasketItem {
  
  return {
    itemId: item.productId,
    itemName: item.prodName,
    itemPrice: item.prodPrice,
    itemQuantity:quantity,
    itemPicture: item.prodPicture,
    itemBrand: item.productBrand,
    itemType: item.productType
  }
}
}
