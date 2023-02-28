import { Component } from '@angular/core';
import { AbstractControl, FormBuilder, FormControl, AsyncValidatorFn, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { debounceTime, finalize, map, switchMap, take } from 'rxjs';
import { UserAccountService } from '../account.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent {

  errors : string[] | null = null;

  RegularExpression="^(?=(.*[a-z]){1,})(?=(.*[\\d]){1,})(?=(.*[\\W]){1,})(?!.*\\s).{7,30}$";

  constructor(private formbuilder:FormBuilder, 
  private accountService:UserAccountService, 
  private router : Router,
  private toastr : ToastrService){
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
          Email: ['',[Validators.required, Validators.email]],
          Password: ['',[Validators.required,Validators.pattern(this.RegularExpression)]],
          // ConfirmPassword: ['',[Validators.required]]
  });

  onSubmit(){
    // console.log(this.registerForm.value)
    this.accountService.Register(this.registerForm.value).subscribe({
      next: ()=>{
         this.toastr.success("Registered succecssfully");
         this.router.navigateByUrl('/products')},
      error : error => { 
        this.toastr.success("Not Registered");
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
  

}
