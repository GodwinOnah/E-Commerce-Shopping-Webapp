import { Component } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { ToastrService } from 'ngx-toastr';
import { ProdshopmodService } from '../prodshopmod.service';

@Component({
  selector: 'app-product-brand',
  templateUrl: './product-brand.component.html',
  styleUrls: ['./product-brand.component.scss']
})
export class ProductBrandComponent {

  errors : string[] | null = null;
  ids = [];
  names: string[] = [];
  maxId: any=0;

  constructor(private formbuilder:FormBuilder,
    private productsService : ProdshopmodService,
    private toastr : ToastrService,
    private matdialog : MatDialog,
    private prodshopmodService: ProdshopmodService){

  }

  ngOnInit(): void {
    this.GetProductBrands();  
  }

  brandForm = this.formbuilder.group({
    Name: ['',Validators.required]
  })

  onSubmit(){
  
     
      const find = this.names.find(x=>x.toLowerCase() === 
      this.brandForm?.get('Name')?.value.toLowerCase());
      if(find)
      {
        this.toastr.success("Brand already exist"
        );}
    
        this.productsService.UploadBrand(this.maxId+1,this.brandForm?.get('Name')?.value).subscribe({
          next: ()=>{
            this.toastr.success("New brand added");
            window.location.reload();
             
          },
          error : error => { 
            this.toastr.success("Not added");
            this.errors = error.errors  } 
          
        });
      }
    
   
  
  closeDialog(){
    this.matdialog.closeAll(); // <- Close the mat dialog
  }

  GetProductBrands(){
    this.prodshopmodService.getBrands().subscribe({
      next: brands=>{ 
        for(let x of brands){
          this.ids.push(x.id);
          this.names.push(x.name);    
    }
    this.maxId = this.ids.reduce((a, b) => Math.max(a, b));      
      },
      error:error=>console.log(error)         
  });
  }

}
