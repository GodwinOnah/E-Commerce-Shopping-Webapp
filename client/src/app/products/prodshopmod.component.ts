import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { IProduct } from '../prodsharemod/models/IProduct';
import { IBrands} from '../prodsharemod/models/IBrands';
import { ProdshopmodService } from './prodshopmod.service';
import { ShopParameters } from '../prodsharemod/models/shopParameters';
import { delay } from 'rxjs';
import { UserAccountService } from '../Account/account.service';


@Component({
  selector: 'app-shop',
  templateUrl: './prodshopmod.component.html',
  styleUrls: ['./prodshopmod.component.scss']
})
export class ProdshopmodComponent implements OnInit {
  @ViewChild('search',{static:false}) searchText: ElementRef;
  products:IProduct[];
  brands:IBrands[];
  productTypes:IBrands[];
  shopParameters=new ShopParameters();
  totalPageNumber:number;
  sortingOptions=[
    {name:'Alphabeltical', value:'name'},
    {name:'Price: High to Low', value:'priceDecrease'},
    {name:'Price: Low to High', value:'priceIncrease'}
  ];

  constructor(private prodshopmodService: ProdshopmodService, public accountService:UserAccountService) {
  }

  ngOnInit(){
    this.GetProductTypes();
    this.GetProductBrands();
    this.GetProducts();

  }

  GetProducts(){

  this.prodshopmodService.getProducts(this.shopParameters).subscribe(response=>{
           
           this.products=response.data; 
           this.shopParameters.pageNumber=response.pageIndex;
           this.shopParameters.pageSize=response.pageSize;
           this.totalPageNumber=response.count;
          },
          error=>{console.log(error)
    
  });
}

  GetProductBrands(){
  
        this.prodshopmodService.getBrands().subscribe(response=>{
        this.brands=[{productId:0,name:'All'}, ...response];         
          },
          error=>{console.log(error)         
  });
}
   
  GetProductTypes(){
        this.prodshopmodService.getProductTypes().subscribe(response=>{
              this.productTypes=[{productId:0,name:'All'}, ...response];;
            },
            error=>{console.log(error)   
  });
} 
  
  SelectedBrand(brandId:number){
    this.shopParameters.brandId=brandId;
    this.shopParameters.pageNumber=1;
    this.GetProducts();
}

  SelectedType(typeId:number){
    this.shopParameters.typeId=typeId;
    this.shopParameters.pageNumber=1;
    this.GetProducts();
}

SortedProducts(sort:string){
this.shopParameters.sort=sort;
this.GetProducts();
}

PageChange(event:any){
if(this.shopParameters.pageNumber!=event){ 
this.shopParameters.pageNumber=event;
this.GetProducts();
  }
}

Search(){
this.shopParameters.search=this.searchText.nativeElement.value;
this.shopParameters.pageNumber=1;
this.GetProducts();
}

ResetSearch(){
  this.searchText.nativeElement.value='';
  this.shopParameters=new ShopParameters();
  this.GetProducts();
  }
}
