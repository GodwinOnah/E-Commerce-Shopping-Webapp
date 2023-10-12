import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { IAdverts } from 'app/prodsharemod/models/IAdverts';
import { environment } from 'environments/environment';
import { ToastrService } from 'ngx-toastr';
import { BehaviorSubject } from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class AdvertsService {

  private advertSource = new BehaviorSubject<IAdverts|null>(null);
  adverts$  = this.advertSource.asObservable();
  baseUrl = environment.apiUrl;

  constructor( private http : HttpClient, 
    private router : Router,
    private toastr : ToastrService,) { }

  submitAdvert(advert: any){
    return this.http.post<string>(this.baseUrl+'advert',advert);
  }

  getAdvertsById(id:number){
    return this.http.get<IAdverts>(this.baseUrl+'advert/'+id);
  }

  getAdverts(){
    return this.http.get<IAdverts[]>(this.baseUrl+'advert');
  }

  deleteAdverts(id : number){
    return this.http.delete(this.baseUrl+'advert/'+id); 
  }
}
