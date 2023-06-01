import { Component } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { IAdverts } from 'src/app/prodsharemod/models/IAdverts';
import { AdvertsService } from './adverts.service';

@Component({
  selector: 'app-adverts',
  templateUrl: './adverts.component.html',
  styleUrls: ['./adverts.component.scss']
})
export class AdvertsComponent {

  errors : string[] | null = null;
  

  constructor(
    private formbuilder:FormBuilder,
    private router : Router,
    private matdialog : MatDialog,
    private toastr : ToastrService,
    private advert : AdvertsService
   
   ){}

  advertForm = this.formbuilder.group({
    advert: ['',[Validators.required]],
    time: [''],
    
});

submitAdvert(){
  this.advert.submitAdvert(this.advertForm.value).subscribe({
    next : advert => {
      this.closeDialog();
      this.toastr.success("Advert added"); 
      window.location.reload();   
    },
      error : error => { 
        this.errors = error.errors
        this.toastr.success("Advert not added");
      }
  });

}

closeDialog(){
  this.matdialog.closeAll(); // <- Close the mat dialog
}
}


