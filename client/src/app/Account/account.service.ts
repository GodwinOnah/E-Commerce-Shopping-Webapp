import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { BehaviorSubject, map } from 'rxjs';
import { environment } from 'src/environment/environment';
import { User } from '../prodsharemod/models/User';

@Injectable({
  providedIn: 'root'
})
export class UserAccountService {

  baseUrl = environment.apiUrl;
  private AppUserSource = new BehaviorSubject<User|null>(null);
  AppUser$  = this.AppUserSource.asObservable();
  loginStatus=false;

  constructor(private http : HttpClient, private router : Router) { }

  LoadPreviousUser(token:any){

        let headers = new HttpHeaders();
        headers = headers.set('Authorization', `Bearer ${token}`);


        return this.http.post<User>(this.baseUrl+'user',{headers})
        .pipe(
          map(
            user=>{
                  localStorage.setItem("token",user.token)
                  this.AppUserSource.next(user);
            
            
          }))

  }

  

    Login(value:any){

          return this.http.post<User>(this.baseUrl+'user/login',value)
          .pipe(
            map(
              user=>{
                // console.log(5);
                // console.log(user.nickName);
                    localStorage.setItem('token',user.token)
                    this.loginStatus==true;
                    // localStorage.setItem('login_status',false)
                  this.AppUserSource.next(user);
              
              
            }))
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

    CheckEmail(email:string){

      return this.http.get<boolean>(this.baseUrl+'user/emailexist?email='+email)

    }

    Logout(){

      localStorage.removeItem('token');
      this.AppUserSource.next(null);
      this.router.navigateByUrl('/');
    }



}
