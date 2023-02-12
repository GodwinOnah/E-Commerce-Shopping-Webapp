import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Route, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { map, Observable } from 'rxjs';
import { UserAccountService } from '../Account/account.service';

@Injectable({
  providedIn: 'root'
})
export class GuardsGuard implements CanActivate {

  constructor(private accountService:UserAccountService, private router:Router){


  }
  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean> {
    return this.accountService.AppUser$.pipe(map(

      auth=>{
      if (auth) return true;
    else{
        this.router.navigate(['/account/login'], {queryParams:{returnParam:state.url}});
        return false;
    }}
    ));
  }
  
}
