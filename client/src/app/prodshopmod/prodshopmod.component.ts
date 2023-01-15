import { Component, OnInit } from '@angular/core';
import { IProduct } from '../prodsharemod/models/IProduct';
import { IBrands} from '../prodsharemod/models/IBrands';
import { ProdshopmodService } from './prodshopmod.service';

@Component({
  selector: 'app-shop',
  templateUrl: './prodshopmod.component.html',
  styleUrls: ['./prodshopmod.component.scss']
})
export class ProdshopmodComponent implements OnInit {

  products:IProduct[];
  brands:IBrands[];
  productTypes:IBrands[];
  brandSelected=0;
  typeSelected=0;
  sort="name";
  sortingOptions=[
    {name:'Alphabeltical', value:'name'},
    {name:'High to Low', value:'priceDecrease'},
    {name:'Low to High', value:'priceIncrease'}
  ];

  constructor(private prodshopmodService: ProdshopmodService) {
  }

  ngOnInit(){
    this.GetProductTypes();
    this.GetProductBrands();
    this.GetProducts();

  }

  GetProducts(){

  this.prodshopmodService.getProducts(this.brandSelected,this.typeSelected,this.sort).subscribe(response=>{

            this.products=response.data;
            console.log(this.products)
          },
          error=>{console.log(error)
    
  });
}

  GetProductBrands(){
  
  this.prodshopmodService.getBrands().subscribe(response=>{

            this.brands=[{productId:0,name:'All'}, ...response];
            console.log(this.brands)
          },
          error=>{console.log(error)         
  });
}
   
  GetProductTypes(){
  this.prodshopmodService.getProductTypes().subscribe(response=>{

              this.productTypes=[{productId:0,name:'All'}, ...response];;
              console.log(this.productTypes)
            },
            error=>{console.log(error)   
  });
} 
  
  SelectedBrand(brandId:number){
    this.brandSelected=brandId;
    this.GetProducts();

}

  SelectedType(typeId:number){
    this.typeSelected=typeId;
    this.GetProducts();

}

SortedProducts(sort:string){
this.sort=sort;
this.GetProducts();

}


}
