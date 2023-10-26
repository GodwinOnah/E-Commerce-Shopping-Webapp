import { Component, OnInit } from '@angular/core';
import { UserAccountService } from 'app/Account/account.service';
import { IProduct } from '../prodsharemod/models/IProduct';
import { environment } from 'environments/environment';
import { ProdshopmodService } from '../products/prodshopmod.service';

@Component({
  selector: 'app-home-page',
  templateUrl: './home-page.component.html',
  styleUrls: ['./home-page.component.scss']
})
export class HomePageComponent implements OnInit{

  products:IProduct[];
  adminEmail = environment.adminEmail;
  adverts:string='Thank you for visiting my website.'+' '.repeat(10);
  loginAdvert=" Login as admin by using: Email: godwinbillions@gmail.com, Password: Gut101@@"
  errors : string[] | null = null;
  


  constructor(private prodshopmodService: ProdshopmodService,
    public accountservice:UserAccountService) {
  }

  ngOnInit(): void {
    this.GetAdverts();

    this.prodshopmodService.getProducts().subscribe({
      next: response=>{          
    this.products=response.data;   
  },
  error:error=>console.log(error)
});

}

openRegDialog(){
  this.accountservice.openRegDialog();  
}

GetAdverts(){
  this.prodshopmodService.GetAdverts().subscribe({
    next : adverts => {
      if(adverts)
      for(let x of adverts){
        if(adverts.length>1){
          this.adverts = x.advert+" | ".slice(0,-2);
         
        }
        else{
          this.adverts = x.advert
        }

      }
 },
   error : error => { 
     this.errors = error.errors
   }

  });
}
}
