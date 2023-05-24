import { Component } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { ProdshopmodService } from '../prodshopmod.service';


@Component({
  selector: 'app-items',
  templateUrl: './items.component.html',
  styleUrls: ['./items.component.scss']
})
export class ItemsComponent {


  errors : string[] | null = null;
  constructor(private formbuilder:FormBuilder,
    private productsService : ProdshopmodService,
    private toastr : ToastrService){

  }

  productForm = this.formbuilder.group({
    prodName: ['',Validators.required],
    prodPicture: ['',Validators.required],
    prodDescription: ['',Validators.required],
    prodPrice: ['',Validators.required],
    productBrand: ['',Validators.required],
    productTypes: ['',Validators.required],
   
});

onSubmit(){
  // console.log(this.registerForm.value)
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
