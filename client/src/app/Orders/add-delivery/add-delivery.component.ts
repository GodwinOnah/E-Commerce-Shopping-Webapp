import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { ToastrService } from 'ngx-toastr';
import { OrdersService } from '../orders.service';

@Component({
  selector: 'app-add-delivery',
  templateUrl: './add-delivery.component.html',
  styleUrls: ['./add-delivery.component.scss']
})
export class AddDeliveryComponent {
  errors : string[] | null = null;
  deliveries : string[] =[];
 
  constructor(
    private formbuilder:FormBuilder,
    private matdialog : MatDialog,
    private toastr : ToastrService,   
    private http : HttpClient,
    private oderService : OrdersService){
  }

  delForm = this.formbuilder.group({
    delName: ['',Validators.required],
    delTime: ['',Validators.required],
    delDescription: ['',Validators.required],
   delPrice: ['',Validators.required]
});

ngOnInit(): void {
  this.GetDelivery()
}

onSubmit(){
  const find = this.deliveries.find(x=>x ==
  this.delForm?.get('delTime')?.value);
  console.log(find)
  if(find)
  {  
    this.toastr.success("Delivery already exist"); 
   return;
}

  this.oderService.AddDelivery(this.delForm.value).subscribe({
    next: delivery=>{
      if(delivery==true)
      {
      this.closeDialog();
      window.location.reload();
      return this.toastr.success("Delivery Added");
      
     
      }
      return this.toastr.success("Delivery not added");
    },
    error : error => { 
      this.toastr.success("Check your server");
      this.errors = error.errors  }   
  });  
}

closeDialog(){
  this.matdialog.closeAll(); // <- Close the mat dialog
}

GetDelivery(){
  this.oderService.getDelivery().subscribe({
    next: delivery=>{ 
      for(let x of delivery){
        this.deliveries.push(x.delTime.substring(0,1));
  }
    
    },
    error:error=>console.log(error)         
});
}
}
