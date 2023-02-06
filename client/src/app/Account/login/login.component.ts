import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { UserAccountService } from '../account.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent {

  constructor(private accountService:UserAccountService){

  }

  loginForm = new FormGroup({
    email: new FormControl('',Validators.required),
    password: new FormControl('',Validators.required)
  });

  onSubmit(){
    // console.log(5);
    this.accountService.Login(this.loginForm.value).subscribe({
      next: user=>{
        // console.log(5);
        console.log(user);
     
   } });
    
  }

}
