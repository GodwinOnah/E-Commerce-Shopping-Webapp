import { Component, Input, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { BasketService } from 'app/basket/basket.service';
import { IDelivery } from 'app/prodsharemod/models/IDelivery';
import { CheckoutServiceService } from '../../checkout-service.service';

@Component({
  selector: 'app-checkout-delivery',
  templateUrl: './checkout-delivery.component.html',
  styleUrls: ['./checkout-delivery.component.scss']
})
export class CheckoutDeliveryComponent implements OnInit{
  @Input() deliveryForm? : FormGroup;
  deliverys : IDelivery[] = [];

 
  
  constructor(
    private checkoutService : CheckoutServiceService, 
    public basketService : BasketService){}

  ngOnInit(): void {
   this.getDelivery();
  }


  getDelivery(){
    this.checkoutService.GetDelivery().subscribe(
      {
        next: delivery => {    
          this.deliverys = delivery
        }     
      }
    )
  }
  setDeliveryPrice(delivery:IDelivery){
      this.basketService.SetDelivery(delivery);
  }
 
}
