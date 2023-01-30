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

  // baseUrl = location.origin;
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
      console.log(response);
      // console.log(5);
      this.basketSource.next(response);//updates basket with new values
      console.log(response);
      // console.log('5');
    },error=>{console.log(error)}
    );    
}

CurrentBasket(){
  //  console.log(this.basketSource.value);
  return this.basketSource.value;
}

AddItemsToBasket(item:IProduct,quantity){
  const itemToAdd:IBasketItem = this.MapBasketToBasketItem(item,quantity);
  // console.log(itemToAdd);
  const basket = this.CurrentBasket()??this.CreateBasket();
  // console.log(basket);
  basket.items = this.AddOrUpdate(basket.items,itemToAdd,quantity);
  // console.log(basket.items);
  // console.log(basket.id);
  // console.log(5);
  this.SetBasket(basket);
}

private AddOrUpdate(items: IBasketItem[], itemToAdd: IBasketItem, quantity: number): IBasketItem[] {
    const index=items.findIndex(index=>index.itemId===itemToAdd.itemId);
    // console.log(index);
    if(index==-1){
      itemToAdd.itemQuantity=quantity;
      items.push(itemToAdd);
      // console.log(items);
    }
      else{ items[index].itemQuantity+=quantity;}

    return items;

  }

private CreateBasket(): IBasket {
    const basket=new Basket();
    // console.log(basket);
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
