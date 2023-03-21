import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { BehaviorSubject, map, of, ReplaySubject } from 'rxjs';
import { environment } from 'src/environment/environment';
import { Address, User } from '../prodsharemod/models/User';

@Injectable({
  providedIn: 'root'
})
export class UserAccountService {

  baseUrl = environment.apiUrl;
  private AppUserSource = new ReplaySubject<User|null>(1);
  AppUser$  = this.AppUserSource.asObservable();
   loginStatus = true;

  constructor(
    private http : HttpClient, 
    private router : Router,
    private toastr : ToastrService) { }

  LoadPreviousUser(token:string){
// console.log(token)
     if(token===null)
     {
      this.AppUserSource.next(null);
      return of(null); //return null observable
     }
        // let headers = new HttpHeaders({'Content-Type':'application/json; charset=utf-8'});
        // console.log(token)
        // headers = headers.set('Authorization', `Bearer ${token}`);
        // console.log(headers)
        return this.http.get<User>(this.baseUrl+'user',
        {headers:new HttpHeaders({'Authorization': 'Bearer '+token})})
        .pipe(
          map(
            user=>{
              // console.log(user)
                localStorage.setItem("token",user.token)
                this.AppUserSource.next(user);
                
                
          }))
  }

    Login(value:any){

          return this.http.post<User>(this.baseUrl+'user/login',value)
          .pipe(
            map(
              user=>{
                    localStorage.setItem('token',user.token)
                    this.AppUserSource.next(user);             
            }))
      }

    Register(value:any){
      // console.log(value)
          return this.http.post<User>(this.baseUrl+'user/register',value)
          .pipe(
            map(
              user=>{
                    localStorage.setItem('token',user.token)
                   this.AppUserSource.next(user);          
            }))
  
}

    CheckEmail(email:string){
      return this.http.get<boolean>(this.baseUrl+'user/emailexist?email='+email)
    }

    Logout(){
      this.toastr.success("Logged Out") 
      localStorage.removeItem('token');
      this.AppUserSource.next(null);
      this.router.navigateByUrl('/');
      // localStorage.setItem('login_status', JSON.stringify(!this.loginStatus))
    }

    GetAddress(){
      return this.http.get<Address>(this.baseUrl+'user/address')
    }

    UpdateAddress(address:Address){
      return this.http.put<Address>(this.baseUrl+'user/address',address)
    }

}
