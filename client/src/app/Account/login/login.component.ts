import { Component } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { UserAccountService } from '../account.service';





@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent {
  errors : string[] | null = null;
  view : boolean = true;
  changetype : boolean = true;
  successful : boolean = false;

  RegularExpression="^(?=(.*[a-z]){1,})(?=(.*[\\d]){1,})(?=(.*[\\W]){1,})(?!.*\\s).{7,30}$";

  returnUrl:string;

  constructor(
    private formbuilder:FormBuilder,
    private router : Router,
    private accountService : UserAccountService,
    private activatedRoute : ActivatedRoute,
    private toastr : ToastrService,
   
   ){
    this.returnUrl = this.activatedRoute.snapshot.queryParams['returnUrl']||'/prodshopmod'
  }

  loginForm = this.formbuilder.group({
        Email: ['',[Validators.required]],
        Password: ['',[Validators.required]]
  });

  onLoginSubmit(){
    this.accountService.Login(this.loginForm.value).subscribe({
      next: ()=> {
        this.successful=true;
       this.closeDialog();
        this.toastr.success("Login succecssfully") ;
        this.router.navigateByUrl('/products');
        this.accountService.autoLogout();
      },
        error : error => {
          this.toastr.success("Wrong password") 
          this.errors = error.errors}
    });
    
  }

  openRegDialog(){
    this.accountService.openRegDialog();
  }

  closeDialog(){
    this.accountService.closeDialog(); // <- Close the mat dialog
  }

  openConfirmEmailDialog(){
    this.accountService.openConfirmEmailDialog();
  }

  viewpass(){
    this.view = !this.view;
    this.changetype = !this.changetype;
  }

  success(){
    if(this.successful = true) return true;
  }


 

}
