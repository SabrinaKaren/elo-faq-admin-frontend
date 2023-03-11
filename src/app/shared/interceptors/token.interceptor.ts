import { HttpErrorResponse, HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable, tap } from "rxjs";
import { ContextService } from '../context.service';

@Injectable()
export class TokenInterceptor implements HttpInterceptor {

  environmentConfig: any;

  constructor(
    private context: ContextService
  ) { }

  intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {

    let token = this.context.getUserData();
    if (token) {
      request = request.clone({
        setHeaders: {
          Authorization: `Bearer ${token}`
        }
      });
    }
    
    return next.handle(request)
        .pipe(tap({
          error: err => {
            if (err instanceof HttpErrorResponse) {
              if (err.status !== 401) {
                return;
              }
              // this.router.navigate(['unauthorized']);
            }
          },
        }));

  }

}