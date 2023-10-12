import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { IOrders } from 'app/prodsharemod/models/IOrders';



@Component({
  selector: 'app-success',
  templateUrl: './success.component.html',
  styleUrls: ['./success.component.scss']
})
export class SuccessComponent {
  order?: IOrders
  
constructor(private router: Router) {
const navigation = this.router.getCurrentNavigation();
this.order = navigation?.extras?.state as IOrders
}

}
