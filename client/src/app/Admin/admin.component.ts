import { Component } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ItemsComponent } from '../products/productItems/items.component';


@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.scss']
})
export class AdminComponent {

  admin: string ="";


  constructor(private matdialog : MatDialog){}

  openUploadProduct(){
    this.matdialog.open(ItemsComponent,
      {height: '70%',
    width: '50%'});
  }
 
}
