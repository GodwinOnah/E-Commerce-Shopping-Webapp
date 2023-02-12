import { Component } from '@angular/core';
import { AbstractControl, FormBuilder, FormControl, AsyncValidatorFn, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
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
  private accountService:UserAccountService, private router : Router){
  }
  registerForm = this.formbuilder.group({
          firstname: ['',Validators.required],
          middlename: [''],
          familyname: ['',Validators.required],
          address: ['',Validators.required],
          city: ['',Validators.required],
          country: ['',Validators.required],
          zipcode: ['',Validators.required],
          phone: ['',Validators.required],
          email: ['',[Validators.required, Validators.email],[this.validateEmail()]],
          password: ['',[Validators.required,Validators.pattern(this.RegularExpression)]],
          confirmpassword: ['',[Validators.required]]
  });

  onSubmit(){
    this.accountService.Register(this.registerForm.value).subscribe({
      next: ()=> this.router.navigateByUrl('/prodshopmod'),
      error : error => this.errors = error.errors   
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
