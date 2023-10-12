import { Component } from '@angular/core';
import { FormBuilder,Validators } from '@angular/forms';
import {Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import {  MatDialog } from '@angular/material/dialog';
import { LoginComponent } from '../../login/login.component';
import { UserAccountService } from '../../account.service';




@Component({
  selector: 'app-forgotpasswrd',
  templateUrl: './forgotpasswrd.component.html',
  styleUrls: ['./forgotpasswrd.component.scss']
})
export class ForgotpasswrdComponent {
  errors : string[] | null = null;

  password : string = "";
  view1 : boolean = true;
  view2 : boolean = true;
  changetype1 : boolean = true;
  changetype2 : boolean = true;

  RegularExpression="^(?=(.*[a-z]){1,})(?=(.*[\\d]){1,})(?=(.*[\\W]){1,})(?!.*\\s).{7,30}$";

  constructor(
    private formbuilder:FormBuilder,
    private router : Router,
    private accountService:UserAccountService,
    private toastr : ToastrService,
    private matdialog:MatDialog
    
   ){

   
  }

  forgotpasswrdForm = this.formbuilder.group({
        Email: ['',[Validators.required]],
        Password1: ['',[Validators.required,Validators.pattern(this.RegularExpression)]],
        Password2: ['',[Validators.required,Validators.pattern(this.RegularExpression)]]
  });

  onForgotPassSubmit(){

    const email = this.forgotpasswrdForm?.get('Email')?.value;
    this.accountService.CheckEmail(email).subscribe({
      next: yes => {
        if(yes)
        this.accountService.ForgotPasswrd(this.forgotpasswrdForm.value).subscribe({
          next: ()=> {
            this.toastr.success("Password Changed succecssfully") },
            error : error => {
              this.toastr.success("Password mismatch") 
              this.errors = error.errors}
        });

       else{
        this.toastr.success("Not a registered user") 
       }
      },
        error : error => {
          this.toastr.success("Check your server") 
          this.errors = error.errors}
    });   
}

  openLoginDialog(){
    this.matdialog.open(LoginComponent,
      {height: 'auto',
    width: '50%'});
  }

  viewpass1(){
    this.view1 = !this.view1;
    this.changetype1 = !this.changetype1;
  }

  viewpass2(){
    this.view2 = !this.view2;
    this.changetype2 = !this.changetype2;
  }



 

 

}
