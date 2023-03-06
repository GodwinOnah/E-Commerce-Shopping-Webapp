import { Component, OnInit } from '@angular/core';
import { IProduct } from '../prodsharemod/models/IProduct';
import { ShopParameters } from '../prodsharemod/models/shopParameters';
import { ProdshopmodService } from '../products/prodshopmod.service';

@Component({
  selector: 'app-home-page',
  templateUrl: './home-page.component.html',
  styleUrls: ['./home-page.component.scss']
})
export class HomePageComponent implements OnInit{

  products:IProduct[];
  shopParameters=new ShopParameters();
  console=console;


  constructor(private prodshopmodService: ProdshopmodService) {
  }

  ngOnInit(): void {
    this.prodshopmodService.getProducts().subscribe({
      next: response=>{          
    this.products=response.data;   
  },
  error:error=>console.log(error)
});}}
