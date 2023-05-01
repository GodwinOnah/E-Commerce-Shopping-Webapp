import { Component } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
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

  RegularExpression="^(?=(.*[a-z]){1,})(?=(.*[\\d]){1,})(?=(.*[\\W]){1,})(?!.*\\s).{7,30}$";

  returnUrl:string;

  constructor(
    private formbuilder:FormBuilder,
    private router : Router,
    private accountService:UserAccountService,
    private activatedRoute:ActivatedRoute,
    private toastr : ToastrService,
    private matdialog:MatDialog
    
   ){

    this.returnUrl = this.activatedRoute.snapshot.queryParams['returnUrl']||'/prodshopmod'

  }

  forgotpasswrdForm = this.formbuilder.group({
        Password1: ['',[Validators.required]],
        Password2: ['',[Validators.required]]
  });

  onForgotPassSubmit(){
    // console.log(5);
    
    var pass1 =this.forgotpasswrdForm.get('Password1')
    var pass2 =this.forgotpasswrdForm.get('Password2')

    if(pass1!=pass2){
    this.toastr.success("Password missmatch") }
    else{
    
    this.accountService.ForgotPasswrd(pass1).subscribe({
      next: ()=> {
        this.toastr.success("Password Changed succecssfully") 
        error : error => {
          this.toastr.success("Password not changed") 
          this.errors = error.errors}
    }});
    
  }
}

  openRegDialog(){
    this.matdialog.open(LoginComponent,
      {height: '80%',
    width: '50%'});
  }


 

}
