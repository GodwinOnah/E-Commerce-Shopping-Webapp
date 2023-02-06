import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent {


  registerForm = new FormGroup({
          firstname: new FormControl('',Validators.required),
          middlename: new FormControl(''),
          familyname: new FormControl('',Validators.required),
          address: new FormControl('',Validators.required),
          city: new FormControl('',Validators.required),
          country: new FormControl('',Validators.required),
          zipcode: new FormControl('',Validators.required),
          phone: new FormControl('',Validators.required),
          email: new FormControl('',Validators.required),
          password: new FormControl('',Validators.required),
          confirmpassword: new FormControl('',Validators.required)
  });

  onSubmit(){
    console.log(this.registerForm.value)
  }

}
