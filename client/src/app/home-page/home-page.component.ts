import { Component, OnInit } from '@angular/core';
import { UserAccountService } from 'app/Account/account.service';
import { IProduct } from '../prodsharemod/models/IProduct';
import { environment } from 'environments/environment';
import { ProdshopmodService } from '../products/prodshopmod.service';
import { IAdverts } from 'app/prodsharemod/models/IAdverts';

@Component({
  selector: 'app-home-page',
  templateUrl: './home-page.component.html',
  styleUrls: ['./home-page.component.scss']
})
export class HomePageComponent implements OnInit{

  products:IProduct[];
  adminEmail = environment.adminEmail;
  welcome:string="Welcome to Obande shop. ";
  advert:string="";
  loginAdvert=" You can login as an admin by using: Email: godwinbillions@gmail.com, Password: Gut101@@  "
  errors : string[] | null = null;
  


  constructor(private prodshopmodService: ProdshopmodService,
    public accountservice:UserAccountService) {
  }

  ngOnInit(): void {
    this.GetAdverts();
    this.GetProducts();

}

GetProducts(){
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
      if(adverts ) { 
        let i = 1;
        for(let x of adverts){   
        if(adverts.length>1){
          this.advert +=" "+"("+i+++") "+x.advert
         
        }  else{
          this.advert = 
          x.advert
        }  
 }
}},
   error : error => { 
     this.errors = error.errors
   }
  })
};
}