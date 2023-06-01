import { Component } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { ToastrService } from 'ngx-toastr';
import { IProductTypes } from 'src/app/prodsharemod/models/IProductTypes';
import { ProdshopmodService } from '../prodshopmod.service';

@Component({
  selector: 'app-product-type',
  templateUrl: './product-type.component.html',
  styleUrls: ['./product-type.component.scss']
})
export class ProductTypeComponent {

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
    
    this.GetProductTypes();
    
  }

  typeForm = this.formbuilder.group({
    Name: ['',Validators.required]
  })

  onSubmit(){
    const find = this.names.find(x=>x.toLowerCase() === 
    this.typeForm?.get('Name')?.value.toLowerCase());
    if(find)
    {this.toastr.success("Type already exist");}
    else{
    this.productsService.UploadType(this.maxId+1,this.typeForm?.get('Name')?.value).subscribe({
      next: ()=>{
        window.location.reload();
         this.toastr.success("New product type added");
      },
      error : error => { 
        this.toastr.success("Not uadded");
        this.errors = error.errors  }      
    });
  }}

  closeDialog(){
    this.matdialog.closeAll(); // <- Close the mat dialog
  }

  GetProductTypes(){
    this.prodshopmodService.getProductTypes().subscribe({
      next: types=>{ 
          for(let x of types){
            this.ids.push(x.id); 
            this.names.push(x.name);     
      }
      this.maxId = this.ids.reduce((a, b) => Math.max(a, b));
        },
        error:error=>console.log(error)   
  });
  } 

 
}
