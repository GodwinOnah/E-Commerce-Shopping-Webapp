import { HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { delay, finalize, identity, Observable } from "rxjs";
import { environment } from "src/environments/environment";
import { SpinnerService } from "../NewServices/spinner.service";


@Injectable()
export class WhenLoadingPage implements HttpInterceptor{

    constructor(private spinnerService: SpinnerService){}


    intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
       if(req.url.includes('emailExists')||req.method==='Post'
       &&req.url.includes('order')||req.method==='DELETE')
            return next.handle(req);

       this.spinnerService.WhenBusy();

            return next.handle(req).pipe(
                (environment.production ? identity : delay(1000)),//give a delay of 1 seconds if not in production mode
                finalize(()=>{this.spinnerService.WhenIdle()})

                )
            }


}