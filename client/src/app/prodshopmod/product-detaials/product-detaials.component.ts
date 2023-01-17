import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { IProduct } from 'src/app/prodsharemod/models/IProduct';
import { ProdshopmodService } from '../prodshopmod.service';

@Component({
  selector: 'app-product-detaials',
  templateUrl: './product-detaials.component.html',
  styleUrls: ['./product-detaials.component.scss']
})
export class ProductDetaialsComponent implements OnInit{

  productDetails:IProduct;

  constructor(private prodshopService:ProdshopmodService, private activatedroute:ActivatedRoute){


  }
  ngOnInit(): void {
    this.ViewProduct();
  }

  ViewProduct(){
    this.prodshopService.getProduct(+this.activatedroute.snapshot.paramMap.get('productId')).subscribe(product=>
      {this.productDetails=product;},error=>{console.log(error);
      });
  }
}
