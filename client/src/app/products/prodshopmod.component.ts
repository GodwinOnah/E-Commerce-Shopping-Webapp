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
  @ViewChild('search') searchText?: ElementRef;
  products:IProduct[]=[];
  brands:IBrands[]=[];
  productTypes:IBrands[]=[];
  shopParameters: ShopParameters;
  totalPageNumber=0;
  sortingOptions=[
    {name:'Alphabeltical', value:'name'},
    {name:'Price: High to Low', value:'priceDecrease'},
    {name:'Price: Low to High', value:'priceIncrease'}
  ];

  constructor(private prodshopmodService: ProdshopmodService, public accountService:UserAccountService) {
    this.shopParameters = prodshopmodService.getShopParams();
  }

  ngOnInit(){
    this.GetProductTypes();
    this.GetProductBrands();
    this.GetProducts();

  }

  GetProducts(){
      this.prodshopmodService.getProducts().subscribe({
         next: response=>{ 
          console.log(response)
           this.products=response.data; 
           this.totalPageNumber=response.count;
          },
      error: error => console.log(error)
    
  })
}

  GetProductBrands(){
  
        this.prodshopmodService.getBrands().subscribe({
          next: response=>{ 
                this.brands=[{id:0,name:'All'}, ...response];         
          },
          error:error=>console.log(error)         
  });
}
   
  GetProductTypes(){
        this.prodshopmodService.getProductTypes().subscribe({
          next: response=>{ 
              this.productTypes=[{id:0,name:'All'}, ...response];;
            },
            error:error=>console.log(error)   
  });
} 
  
  SelectedBrand(brandId:number){
    const params = this.prodshopmodService.getShopParams();
    params.brandId=brandId;
    params.pageNumber=1;
    this.prodshopmodService.setShopParams(params);
    this.shopParameters=params;
    this.GetProducts();
}

  SelectedType(typeId:number){
    const params = this.prodshopmodService.getShopParams();
    params.typeId=typeId;
    params.pageNumber=1;
    this.prodshopmodService.setShopParams(params);
    this.shopParameters=params;
    this.GetProducts();
}

SortedProducts(event:any){
  const params = this.prodshopmodService.getShopParams();
  params.sort=event.target.value;
  this.prodshopmodService.setShopParams(params);
  this.shopParameters=params;
this.GetProducts();
}

PageChange(event:any){
  const params = this.prodshopmodService.getShopParams();
if(params.pageNumber!==event){ 
  params.pageNumber=event;
  this.prodshopmodService.setShopParams(params);
  this.shopParameters=params;
this.GetProducts();
  }
}

Search(){
  const params = this.prodshopmodService.getShopParams();
  console.log(22)
  params.search=this.searchText?.nativeElement.value;
  params.pageNumber=1;
  this.prodshopmodService.setShopParams(params);
  this.shopParameters=params;
this.GetProducts();
}

ResetSearch(){
  if (this.searchText)
  this.searchText.nativeElement.value='';
  this.shopParameters =new ShopParameters();
  this.prodshopmodService.setShopParams (this.shopParameters);
  this.GetProducts();
  }
}
