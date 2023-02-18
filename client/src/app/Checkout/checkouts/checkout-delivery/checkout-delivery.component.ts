import { Component, Input, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { IDelivery } from 'src/app/prodsharemod/models/IDelivery';
import { CheckoutServiceService } from '../../checkout-service.service';

@Component({
  selector: 'app-checkout-delivery',
  templateUrl: './checkout-delivery.component.html',
  styleUrls: ['./checkout-delivery.component.scss']
})
export class CheckoutDeliveryComponent implements OnInit{
  @Input() deliveryform?: FormGroup;
  deliverys : IDelivery[] = [];
 
  
  constructor(private checkoutService: CheckoutServiceService){}

  ngOnInit(): void {
    this.checkoutService.GetDeliveryMethod().subscribe(
      {
        next: delivery => this.deliverys = delivery
        // console.log(delivery);}
        
      }
    )
  }

}
