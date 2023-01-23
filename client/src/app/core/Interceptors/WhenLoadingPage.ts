import { HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { delay, finalize, Observable } from "rxjs";
import { SpinnerService } from "../NewServices/spinner.service";

@Injectable()
export class WhenLoadingPage implements HttpInterceptor{

    constructor(private spinnerService: SpinnerService){}


    intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        this.spinnerService.WhenBusy();
       return next.handle(req).pipe(
        finalize(()=>{this.spinnerService.WhenIdle()})

        )
    }


}