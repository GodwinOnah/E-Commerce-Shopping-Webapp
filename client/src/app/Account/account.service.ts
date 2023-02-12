import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { BehaviorSubject, map, of, ReplaySubject } from 'rxjs';
import { environment } from 'src/environment/environment';
import { User } from '../prodsharemod/models/User';

@Injectable({
  providedIn: 'root'
})
export class UserAccountService {

  baseUrl = environment.apiUrl;
  private AppUserSource = new ReplaySubject<User|null>(1);
  AppUser$  = this.AppUserSource.asObservable();
   loginStatus = true;

  constructor(private http : HttpClient, private router : Router) { }

  LoadPreviousUser(token:string|null){

     if(token===null)
     {
      this.AppUserSource.next(null);
      return of(null); //return null observable
     }
        let headers = new HttpHeaders();
        headers = headers.set('Authorization', `Bearer ${token}`);
        return this.http.post<User>(this.baseUrl+'user',{headers})
        .pipe(
          map(
            user=>{
              if(user){
                localStorage.setItem("token",user.token)
                this.AppUserSource.next(user);
                return user;
              }

              else{return null}
                
            
            
          }))

  }

  

    Login(value:any){

          return this.http.post<User>(this.baseUrl+'user/login',value)
          .pipe(
            map(
              user=>{
                // console.log(5);
                // console.log(user.nickName);
                // localStorage.setItem('login_status', JSON.stringify(this.loginStatus))
                    localStorage.setItem('token',user.token)
                   
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
      localStorage.setItem('login_status', JSON.stringify(!this.loginStatus))
    }



}
