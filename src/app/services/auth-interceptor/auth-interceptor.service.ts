import { HttpErrorResponse, HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, Observable, switchMap, throwError } from 'rxjs';
import { AuthService } from '../auth/auth.service';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AuthInterceptorService implements HttpInterceptor{

  constructor(private authService: AuthService, private router: Router) { }

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
      const ACCESS_TOKEN = this.authService.getAccessToken(); 

  
      if (ACCESS_TOKEN) {
        req = this.addTokenHeader(req, ACCESS_TOKEN);
      }

      return next.handle(req).pipe(
        catchError((error:HttpErrorResponse) => {
          if (error.status === 401 && this.authService.getResfreshToken()) {
            return this.tryRefreshingAccessToken(req, next);
          } else {
            return throwError(() => new Error(error.message));
          }
        })
      )
  }


  private addTokenHeader(request: HttpRequest<any>, token: string) {
    return request.clone({
      headers: request.headers.set('Authorization', 'Bearer ' + token)
    });
  }


  tryRefreshingAccessToken(request: HttpRequest<any>, next: HttpHandler) {
    return this.authService.refreshAccessToken().pipe(
      switchMap((newTokens: any) => {
        this.authService.saveAccessToken(newTokens.access)
        return next.handle(this.addTokenHeader(request, newTokens.access))
      }),
      catchError((error) => {
        this.authService.logout();
        this.router.navigate(['/login']);
        return throwError(() => new Error(error.message));
      })
    )
  }
}
