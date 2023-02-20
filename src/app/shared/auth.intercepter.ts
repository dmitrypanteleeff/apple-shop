import { HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Router } from "@angular/router";
import { catchError, Observable, throwError } from "rxjs";
import { AuthService } from "./auth.service";

@Injectable()
export class AuthIntercepter implements HttpInterceptor {
  constructor(
    private auth: AuthService,
    private _router: Router
  ) {

  }
  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    if (this.auth && this.auth.token) {
      req = req.clone({
        setParams: {
          auth: this.auth.token
        }
      })
    }
    return next.handle(req)
      .pipe(
        catchError(error => {
          if (error.status === 401) { // пользователь не авторизован
            this.auth.logout();
            this._router.navigate(['/admin', 'login'])
          }
          return throwError(error )
        })
      )
  }



}
