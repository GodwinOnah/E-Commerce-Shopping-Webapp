import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { UserAccountService } from '../Account/account.service';
import { BasketService } from '../basket/basket.service';
import { IProduct } from '../prodsharemod/models/IProduct';
import { ProdshopmodService } from './prodshopmod.service';

@Component({
  selector: 'app-product-item-child',
  templateUrl: './product-item-child.component.html',
  styleUrls: ['./product-item-child.component.scss']
})
export class ProductItemChildComponent implements OnInit{
  
  @Input() product?: IProduct;
 

  constructor(private basketService: BasketService,
    public accountService:UserAccountService,
    private productsService : ProdshopmodService,
    private toastr : ToastrService,
    private router : Router){
  }

  ngOnInit(): void {
   
   
  }

  
  
  AddItem(){ 
    this.product && this.basketService.AddItemsToBasket(this.product,1)
  }
  DeletItem(){
    this.productsService.DeleteProduct(this.product.id).subscribe(
        deleted=>{
          if(deleted==true){
           window.location.reload();
          this.toastr.success("Product deleted") ;
          }
        }
    );
  }
  
 
}
