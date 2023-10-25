import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { BasketService } from 'app/basket/basket.service';
import { IProduct } from 'app/prodsharemod/models/IProduct';
import { ToastrService } from 'ngx-toastr';
import { take } from 'rxjs';
import { BreadcrumbService } from 'xng-breadcrumb';
import { ProdshopmodService } from '../prodshopmod.service';

@Component({
  selector: 'app-product-detaials',
  templateUrl: './product-detaials.component.html',
  styleUrls: ['./product-detaials.component.scss']
})
export class ProductDetaialsComponent implements OnInit{

  productDetails?:IProduct;
  quantity:number=1;
  quantityInBasket=0;

  constructor(
            private prodshopService:ProdshopmodService, 
            private activatedroute:ActivatedRoute,
            private breadcrumbService:BreadcrumbService,
            private basketService: BasketService,
            private toastr : ToastrService)
            {
              this.breadcrumbService.set('@productName','')
          }

  ngOnInit(): void {
    this.ViewProduct();
  }

  ViewProduct(){
    const id = +this.activatedroute.snapshot.paramMap.get('productId');

    if(id)this.prodshopService.getProduct(id).subscribe(
          { next : product=>
              {
              this.productDetails = product;
              this.breadcrumbService.set('@productName',product.prodName);
              this.basketService.basket$.pipe(take(1)).subscribe({
                next : basket=>{
                  const item = basket?.items.find ( i=>i.id === id )               
                              if(item){
                                this.quantity = item.quantity;
                                this.quantityInBasket=item.quantity
}}})},
                error:error=>console.log(error)
            })}

  AddItem(){

    if(this.productDetails){
      if (this.quantity<1) 
       return this.toastr.success("Item(s) cannot be 0 or negative");
      if(this.quantity>this.quantityInBasket){
        const itemToAdd = this.quantity-this.quantityInBasket;
        this.quantityInBasket += itemToAdd;
        this.basketService.AddItemsToBasket(this.productDetails,itemToAdd)
      }
      else{
        if (this.quantity<1) 
         return this.toastr.success("Item(s) cannot be 0 or negative");
        if(this.quantity<this.quantityInBasket){
          const itemToReduce=this.quantityInBasket-this.quantity;
          this.quantityInBasket-=itemToReduce;
          this.basketService.RemoveItemsFromBasket(this.productDetails.id,itemToReduce) 
        }
      }
    }  
  }

 get ButtonTxt(){
  return this.quantityInBasket==0?"Add quantity":"Update"   
  }

  ReduceQuantity(){
    if(this.quantity<1) return;
    this.quantity--;  
  }

  IncreaseQuantity(){
    this.quantity++;  
  }
}
