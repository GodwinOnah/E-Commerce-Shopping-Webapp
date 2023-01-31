import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { BasketService } from 'src/app/basket/basket.service';
import { IProduct } from 'src/app/prodsharemod/models/IProduct';
import { BreadcrumbService } from 'xng-breadcrumb';
import { ProdshopmodService } from '../prodshopmod.service';

@Component({
  selector: 'app-product-detaials',
  templateUrl: './product-detaials.component.html',
  styleUrls: ['./product-detaials.component.scss']
})
export class ProductDetaialsComponent implements OnInit{

  productDetails:IProduct;

  constructor(private prodshopService:ProdshopmodService, 
            private activatedroute:ActivatedRoute,
            private breadcrumbService:BreadcrumbService,
            private basketService: BasketService)
            {

              this.breadcrumbService.set('@productName','')

          }

  ngOnInit(): void {
    this.ViewProduct();
  }

  ViewProduct(){
    this.prodshopService.getProduct(+this.activatedroute.snapshot.paramMap.get('productId')).subscribe(product=>
      {this.productDetails=product;
      this.breadcrumbService.set('@productName',product.prodName)
      },error=>{console.log(error);
      });
  }

  AddItem(){
    this.basketService.AddItemsToBasket(this.productDetails,1)
  }

}
