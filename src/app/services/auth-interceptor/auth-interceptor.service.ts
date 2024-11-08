import { HttpErrorResponse, HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, catchError, EMPTY, Observable, switchMap, throwError } from 'rxjs';
import { AuthService } from '../auth/auth.service';
import { filter, take } from 'rxjs/operators';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AuthInterceptorService implements HttpInterceptor {
  
  private isRefreshing = false;
  private refreshTokenSubject: BehaviorSubject<string | null> = new BehaviorSubject<string | null>(null);

  constructor(private authService: AuthService, private router: Router) { }


  /**
   * Intercepts outgoing HTTP requests, attaching the access token in headers and handling
   * specific errors like 401 and 404.
   *
   * @param {HttpRequest<any>} req - The outgoing HTTP request.
   * @param {HttpHandler} next - The next interceptor in the chain.
   * @returns {Observable<HttpEvent<any>>} Observable of the HTTP event.
   */
  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
      const ACCESS_TOKEN = this.authService.getAccessToken(); 

      if (ACCESS_TOKEN) {
        req = this.addTokenHeader(req, ACCESS_TOKEN);
      }

      return next.handle(req).pipe(
        catchError((error: HttpErrorResponse) => {
          if (error.status === 401 && !req.url.includes('api/token/refresh') && this.authService.getResfreshToken()) {
            return this.tryRefreshingAccessToken(req, next);
          } else if (req.url.includes('api/register') || req.url.includes('api/password-reset-confirm')) {
            return throwError(() => error);
          } else if (error.status === 404) {
              this.router.navigate(['/404'])
              return throwError(() => error);
          } else {
            this.authService.logout();
            return throwError(() => error);
          }
        })
      );
  }


  /**
   * Adds the access token to the HTTP request headers.
   *
   * @private
   * @param {HttpRequest<any>} request - The original HTTP request.
   * @param {string} token - The access token to be added to the headers.
   * @returns {HttpRequest<any>} The modified HTTP request with the token header.
   */
  private addTokenHeader(request: HttpRequest<any>, token: string): HttpRequest<any> {
    return request.clone({
      headers: request.headers.set('Authorization', 'Bearer ' + token)
    });
  }


  /**
   * Attempts to refresh the access token and retries the original request.
   *
   * If the token refresh fails, logs the user out. If the refresh is already in progress,
   * waits until the new token is available to retry the request.
   *
   * @private
   * @param {HttpRequest<any>} request - The original HTTP request that needs to be retried.
   * @param {HttpHandler} next - The next interceptor in the chain.
   * @returns {Observable<HttpEvent<any>>} Observable of the HTTP event with the retried request.
   */
  private tryRefreshingAccessToken(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
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
