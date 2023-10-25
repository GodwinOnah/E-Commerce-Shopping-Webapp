import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { IProduct } from '../prodsharemod/models/IProduct';
import { IBrands} from '../prodsharemod/models/IBrands';
import { ProdshopmodService } from './prodshopmod.service';
import { ShopParameters } from '../prodsharemod/models/shopParameters';
import { UserAccountService } from '../Account/account.service';
import { ToastrService } from 'ngx-toastr';

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
  notice : boolean = false;
  errors : string[] | null = null;
  advertsString : string="Stay alert for Averts here";
  sortingOptions=[
    {name:'Alphabeltical', value:'name'},
    {name:'Price: High to Low', value:'priceDecrease'},
    {name:'Price: Low to High', value:'priceIncrease'}
  ];

  constructor(
    private prodshopmodService: ProdshopmodService, 
    public accountService:UserAccountService,
    private toastr : ToastrService
    ) 
    {
    this.shopParameters = prodshopmodService.getShopParams();
  }

  ngOnInit(){
    this.GetProductTypes();
    this.GetProductBrands();
    this.GetProducts();
    this.GetAdverts();

  }

  GetProducts(){
      this.prodshopmodService.getProducts().subscribe({
         next: response=>{ 
          if(response.count==0){
            document.documentElement.style.setProperty('The-grid','null')
          }   
          else{
            document.documentElement.style.setProperty('The-grid','fgrid')
          }     
           this.products=response.data; 
           this.totalPageNumber=response.count;
          },
      error: error => console.log(error)
    
  })
}

  GetProductBrands(){

  
        this.prodshopmodService.getBrands().subscribe({
          next: response=>{ 
            console.log(response)
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
  params.search=this.searchText?.nativeElement.value;
  params.pageNumber=1;
  this.prodshopmodService.setShopParams(params);
  this.shopParameters=params;
this.GetProducts();
}

ResetSearch(){
  if (this.searchText)
  this.searchText.nativeElement.value='';
  this.shopParameters = new ShopParameters();
  this.prodshopmodService.setShopParams (this.shopParameters);
  this.GetProducts();
  }

  GetAdverts(){
      this.prodshopmodService.GetAdverts().subscribe({
        next : adverts => {
          if(adverts)
          if(adverts.length>0) this.notice = true;
          for(let x of adverts){
            if(adverts.length>1){
              this.advertsString = x.advert+" | ".slice(0,-2);
             
            }
            else{
              this.advertsString = x.advert
            }
 
          }
     },
       error : error => { 
         this.errors = error.errors
       }

      });
  }
  DeleteType(id:number){
    this.prodshopmodService.DeleteType(id).subscribe(
        deleted=>{
          if(deleted==true){
           window.location.reload();
          this.toastr.success("Type deleted successively") ;
          }
          else{
            this.toastr.success("Type not deleted ") 
          }
        },
       
    );
  }

  DeleteBrand(id:number){
    this.prodshopmodService.DeleteBrand(id).subscribe(
        deleted=>{
          if(deleted==true){
           window.location.reload();
          this.toastr.success("Brand deleted successively") ;
          }

          else{
            this.toastr.success("Brand not deleted ") 
          }
        }
    );
  }
}
