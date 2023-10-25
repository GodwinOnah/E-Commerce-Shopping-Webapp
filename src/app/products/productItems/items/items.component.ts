import { Component } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { ProdshopmodService } from '../../prodshopmod.service';
import { MatDialog } from '@angular/material/dialog';
import { IProductTypes } from 'app/prodsharemod/models/IProductTypes';
import { IBrands } from 'app/prodsharemod/models/IBrands';
import { IProduct } from 'app/prodsharemod/models/IProduct';
import { environment } from 'environments/environment';


@Component({
  selector: 'app-items',
  templateUrl: './items.component.html',
  styleUrls: ['./items.component.scss']
})
export class ItemsComponent {


  errors : string[] | null = null;
  products : IProduct[]=[];
  brands : IBrands[]=[];
  types : IProductTypes[]=[];
  formdata : FormData = null;
  foundProductName : string = "";
  foundProductPicture : string = "";
  foundProductPrice : number = 0;



  constructor(private formbuilder:FormBuilder,
    private productsService : ProdshopmodService,
    private toastr : ToastrService,
    private matdialog : MatDialog,
    private prodshopmodService: ProdshopmodService){
  }

  productForm = this.formbuilder.group({
    prodName: ['',Validators.required],
    prodPicture: ['',Validators.required],
    prodDescription: ['',Validators.required],
    prodPrice: ['',Validators.required],
    productBrandId: ['',Validators.required],
    productTypeId: ['',Validators.required], 
});

ngOnInit(): void {
  this.GetProductBrands();
  this.GetProductTypes();
  this.GetProducts();
}

onSubmit(){
  for(let x of this.products){
    if(x.prodName.toLowerCase().replaceAll(" ","") === 
    this.productForm?.get('prodName')?.value.toLowerCase().replaceAll(" ",""))
    { 
      this.foundProductPrice = x.prodPrice;
      this.foundProductPicture = x.prodPicture;
    }  
} 

if(this.foundProductPrice.toString() ===
          this.productForm?.get('prodPrice')?.value
              && this.foundProductPicture.slice(environment.apiUrl.length+12) 
                    === this.productForm?.get('prodPicture')?.value.slice(12)
  )
        {
          return this.toastr.success("Sorry!!! Similar product already saved in our database");    
        }
        else{
            this.productsService.saveProductPicture(this.formdata).subscribe({
              next: ()=>{
                this.toastr.success("Picture saved");
                this.sendData();
    },
    error : error => { 
      this.toastr.success("Product not uploaded and picture not saved");
      this.errors = error.errors  }    
  });  
}
}

sendData(){

          this.productsService.UploadProduct(this.productForm.value).subscribe({
          next: ()=>{
            this.toastr.success("Product uploaded");
            window.location.reload();    
          },
          error : error => { 
            this.toastr.success("Product upload error");
            this.errors = error.errors  }  
        });   
}

closeDialog(){
  this.matdialog.closeAll(); // <- Close the mat dialog
}

GetProducts(){
  this.prodshopmodService.getProducts().subscribe({
     next: response=>{
      this.products=response.data 
      },
  error: error => console.log(error)
})}

GetProductBrands(){
  this.prodshopmodService.getBrands().subscribe({
    next: brands=>{ 
          this.brands = brands         
    },
    error:error=>console.log(error)         
});
}

GetProductTypes(){
  this.prodshopmodService.getProductTypes().subscribe({
    next: types=>{ 
        this.types = types
      },
      error:error=>console.log(error)   
});
} 

uploadPicture(e){

    if(e.target.files.length>0){      
       const file = e.target.files[0];
       var formData = new FormData();
       formData.append('myFiles',file);
      this.formdata = formData;
      
  }}}

