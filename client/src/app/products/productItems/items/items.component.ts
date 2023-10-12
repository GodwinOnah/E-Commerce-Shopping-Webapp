import { Component } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { ProdshopmodService } from '../../prodshopmod.service';
import { MatDialog } from '@angular/material/dialog';
import { IProductTypes } from 'app/prodsharemod/models/IProductTypes';
import { IBrands } from 'app/prodsharemod/models/IBrands';


@Component({
  selector: 'app-items',
  templateUrl: './items.component.html',
  styleUrls: ['./items.component.scss']
})
export class ItemsComponent {


  errors : string[] | null = null;
  brands:IBrands[]=[];
  types:IProductTypes[]=[];
  prodName: string[]=[];
  prodBrand: string[]=[];
  prodType: string[]=[];
  prodPictureUrl : string = "";
  formdata : FormData = null;

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
 
  this.productsService.saveProductPicture(this.formdata).subscribe({
    next: ()=>{
       this.toastr.success("Picture saved");
       this.sendData();
    },
    error : error => { 
      this.toastr.success("Picture not saved");
      this.errors = error.errors  } 
    
  });
   
}

sendData(){
  const findName = this.prodName.find(x=>x.toLowerCase() === 
  this.productForm?.get('prodName')?.value.toLowerCase());

  const  findPrice = this.prodType.find(x=>x === 
    this.productForm?.get('prodPrice')?.value);

  if(findName  && findPrice)
  {
    this.toastr.success("Product already exist");
  }
  else{
  this.productsService.UploadProduct(this.productForm.value).subscribe({
  next: ()=>{
    window.location.reload();
     this.toastr.success("Product uploaded");
  },
  error : error => { 
    this.toastr.success("Not uploaded");
    this.errors = error.errors  }  
});
}
}

closeDialog(){
  this.matdialog.closeAll(); // <- Close the mat dialog
}

GetProducts(){
  this.prodshopmodService.getProducts().subscribe({
     next: response=>{
      for(let x of response.data){
       this.prodName.push(x.prodName);
       this.prodBrand.push(x.productBrand); 
       this.prodType.push(x.productType); 
      }},
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

