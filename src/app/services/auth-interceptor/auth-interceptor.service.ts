import { HttpErrorResponse, HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, catchError, Observable, switchMap, throwError } from 'rxjs';
import { AuthService } from '../auth/auth.service';
import { filter, take } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class AuthInterceptorService implements HttpInterceptor {
  
  private isRefreshing = false;
  private refreshTokenSubject: BehaviorSubject<string | null> = new BehaviorSubject<string | null>(null);

  constructor(private authService: AuthService) { }



  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
      const ACCESS_TOKEN = this.authService.getAccessToken(); 

      if (ACCESS_TOKEN) {
        req = this.addTokenHeader(req, ACCESS_TOKEN);
      }

      return next.handle(req).pipe(
        catchError((error: HttpErrorResponse) => {
          if (error.status === 401 && !req.url.includes('api/token/refresh') && this.authService.getResfreshToken()) {
            return this.tryRefreshingAccessToken(req, next);
          } else {
            this.authService.logout();
            return throwError(() => error);
          }
        })
      );
  }



  private addTokenHeader(request: HttpRequest<any>, token: string) {
    return request.clone({
      headers: request.headers.set('Authorization', 'Bearer ' + token)
    });
  }



  private tryRefreshingAccessToken(request: HttpRequest<any>, next: HttpHandler) {
    if (!this.isRefreshing) {
      this.isRefreshing = true;
      this.refreshTokenSubject.next(null);
  
      return this.authService.refreshAccessToken().pipe(
        switchMap((token: any) => {
          this.isRefreshing = false;
          this.refreshTokenSubject.next(token['access']);
          this.authService.saveAccessToken(token['access']);
          return next.handle(this.addTokenHeader(request, token['access']));
        }),
        catchError((error) => {
          this.isRefreshing = false;
          if (error.status === 401 || error.status === 403) {
            this.authService.logout(); 
          }
          return throwError(() => error);
        })
      );
    } else {
      // wait for refreshed access token
      return this.refreshTokenSubject.pipe(
        filter(token => token != null),
        take(1),
        switchMap(token => next.handle(this.addTokenHeader(request, token!)))
      );
    }
  }

}
