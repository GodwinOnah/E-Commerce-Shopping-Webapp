import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { map, of, ReplaySubject } from 'rxjs';
import { BnNgIdleService } from 'bn-ng-idle';
import { Address, User } from '../prodsharemod/models/User';
import { MatDialog } from '@angular/material/dialog';
import { RegisterComponent } from './Register/register.component';
import { ForgotpasswrdComponent } from './forgot_password/forgotpasswrd/forgotpasswrd.component';
import { LoginComponent } from './login/login.component';
import { environment } from 'environments/environment';


@Injectable({
  providedIn: 'root'
})
export class UserAccountService {

  baseUrl = environment.apiUrl;
  private AppUserSource = new ReplaySubject<User|null>(1);
  private WhoSource = new ReplaySubject<Boolean>(1);
  WhoSource$ = this.WhoSource.asObservable();
  AppUser$  = this.AppUserSource.asObservable();
  loginStatus = false;

  constructor(
    private http : HttpClient, 
    private router : Router,
    private toastr : ToastrService,
    private matdialog : MatDialog,
    private logoutOutService : BnNgIdleService) { }

  LoadPreviousUser(token:string){
     if(token===null)
     {
      this.AppUserSource.next(null);
      return of(null); //return null observable
     }
  
        let headers = new HttpHeaders();
        headers = headers.set('Authorization', `Bearer ${token}`);
      
        return this.http.get<User>(this.baseUrl+'user',
              {headers})
                .pipe(
                  map(
                    user=>{ 
                      if(user){
                        localStorage.setItem("token",user.token);
                        this.AppUserSource.next(user);
                        return user;
            } else{return null}
                
          }))
  }

    Login(value:any){

          return this.http.post<User>(this.baseUrl+'user/login',value)
          .pipe(
            map(
              user=>{
                
                    localStorage.setItem('token',user.token)
                    localStorage.setItem("login",this.loginStatus.toString())
                    this.AppUserSource.next(user); 
                    return user;          
            } ))
      }

  ForgotPasswrd(forgotpasswrdDetails:any){

        return this.http.put<User>(this.baseUrl+'user/forgotpasswrd',forgotpasswrdDetails)
        .pipe(
          map(
            user=>{
          } ))
    }

    Register(value:any){
          return this.http.post<User>(this.baseUrl+'user/register',value)
          .pipe(
            map(
              user=>{
                    localStorage.setItem('token',user.token)
                    this.AppUserSource.next(user);          
            }))
  
}

openLoginDialog(){
  this.closeDialog();
  this.matdialog.open(LoginComponent,
    {height: 'auto',
    width: 'auto'});
}

openRegDialog(){
  this.closeDialog();
  this.matdialog.open(RegisterComponent,
    {height: '70%',
  width: '40%'});
}

closeDialog(){
  this.matdialog.closeAll(); // <- Close the mat dialog
}

openConfirmEmailDialog(){
  this.closeDialog();
  this.matdialog.open(ForgotpasswrdComponent,
    {height: 'auto',
  width: '40%'});
}

  CheckEmail(email:string){
      return this.http.get<boolean>(this.baseUrl+'user/emailexist?email='+email)
    }

  Logout(){   
      localStorage.removeItem('token');
      this.AppUserSource.next(null);
      this.router.navigateByUrl('/products');
      this.toastr.success("Logged Out") 
    }

  autoLogout(){
      this.logoutOutService.startWatching(180).subscribe((isTimeOut: Boolean) => {
     if(isTimeOut){
              this.Logout();
              this.logoutOutService.stopTimer();
     }
      })
    }

    GetAddress(token:string){
      let headers = new HttpHeaders();
      headers = headers.set('Authorization', `Bearer ${token}`);
      return this.http.get<Address>(this.baseUrl+'user/address',{headers})
    }

    UpdateAddress(address:Address){
      const token = localStorage.getItem('token');
      let headers = new HttpHeaders();
      headers = headers.set('Authorization', `Bearer ${token}`);
      return this.http.put(this.baseUrl+'user/address',address,{headers});
   }

  
}
