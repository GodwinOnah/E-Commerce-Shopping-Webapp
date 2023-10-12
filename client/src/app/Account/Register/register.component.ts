import { Component } from '@angular/core';
import { AbstractControl, FormBuilder,AsyncValidatorFn,Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { debounceTime, finalize, map, switchMap, take } from 'rxjs';
import { UserAccountService } from '../account.service';
import {  MatDialog } from '@angular/material/dialog';
import { LoginComponent } from '../login/login.component';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent {

  errors : string[] | null = null;
  view1 : boolean = true;
  changetype1 : boolean = true;
  view2: boolean = true;
  changetype2 : boolean = true;

  RegularExpression="^(?=(.*[a-z]){1,})(?=(.*[\\d]){1,})(?=(.*[\\W]){1,})(?!.*\\s).{7,30}$";

  constructor(private formbuilder:FormBuilder, 
  private accountService:UserAccountService, 
  private router : Router,
  private toastr : ToastrService,
  private matDialog :MatDialog){
  }
  registerForm = this.formbuilder.group({
          NickName: ['',Validators.required],
          FirstName: ['',Validators.required],
          MiddleName: [''],
          LastName: ['',Validators.required],
          Street: ['',Validators.required],
          City: ['',Validators.required],
          Country: ['',Validators.required],
          Zipcode: ['',Validators.required],
          Phone: ['',Validators.required],
          Email: ['',[Validators.required, Validators.email],[this.validateEmail()]],
          Password1: ['',[Validators.required,Validators.pattern(this.RegularExpression)]],
          Password2: ['',[Validators.required,Validators.pattern(this.RegularExpression)]],
          // ConfirmPassword: ['',[Validators.required]]
  });

  onSubmit(){
    // console.log(this.registerForm.value)
    this.accountService.Register(this.registerForm.value).subscribe({
      next: ()=>{
        this. closeDialog();
         this.toastr.success("Registered succecssfully");
         this.openLoginDialog()},
      error : error => { 
        this.toastr.success("Not Registered; Check if password are matched");
        this.errors = error.errors  } 
      
    });
  }

  validateEmail() : AsyncValidatorFn {
      return (control:AbstractControl)=>{
        return(control.valueChanges.pipe(
          debounceTime(1000),
          take(1),
          switchMap(()=>{
            return this.accountService.CheckEmail(control.value)
            .pipe(map(result=>result?{emailExists:true}:null),
            finalize(()=>control.markAsTouched())
         ) }
    
          )))}
          
        
    }

    openLoginDialog(){
      this.matDialog.open(LoginComponent,
        {height: '50%',
      width: '50%'});
      } 

      closeDialog(){
        this.accountService.closeDialog(); // <- Close the mat dialog
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
