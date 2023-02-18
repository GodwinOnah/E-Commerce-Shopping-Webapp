import { Component } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { UserAccountService } from '../account.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent {

  RegularExpression="^(?=(.*[a-z]){1,})(?=(.*[\\d]){1,})(?=(.*[\\W]){1,})(?!.*\\s).{7,30}$";

  returnUrl:string;

  constructor(private formbuilder:FormBuilder,private router : Router,
    private accountService:UserAccountService,
   private activatedRoute:ActivatedRoute){

    this.returnUrl = this.activatedRoute.snapshot.queryParams['returnUrl']||'/prodshopmod'

  }

  loginForm = this.formbuilder.group({
        Email: ['',[Validators.required]],
        Password: ['',[Validators.required]]
  });

  onSubmit(){
    // console.log(5);
    this.accountService.Login(this.loginForm.value).subscribe({
      next: ()=> {
        this.router.navigateByUrl('/products')}
     
    });
    
  }

}
