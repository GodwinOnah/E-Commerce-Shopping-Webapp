import { Injectable } from '@angular/core';
import { NgxSpinnerService } from 'ngx-spinner';

@Injectable({
  providedIn: 'root'
})
export class SpinnerService {

  counter=0;

  constructor(private spinnerService:NgxSpinnerService) { }

  WhenBusy(){
    this.counter++;
    this.spinnerService.show(undefined,{
      type:'timer',
      bdColor:'rgba(255, 255, 255, 0.6)',
      color:'skyblue'
});   
  }

  WhenIdle(){
    this.counter--;
    if( this.counter<=0){
      this.counter=0
      this.spinnerService.hide();

    }

  }

}
