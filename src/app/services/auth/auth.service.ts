import { Injectable } from '@angular/core';
import { environment } from '../../../environments/environment.development';
import { HttpClient } from '@angular/common/http';
import { lastValueFrom, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private http: HttpClient) { }

  saveTokens(accessToken: string, refreshToken: string, rememberMe: boolean): void {
    if (rememberMe) {
      // store in local storage
      localStorage.setItem('access_token', accessToken);
      localStorage.setItem('refresh_token', refreshToken);
    } else {
      // store in session storage
      sessionStorage.setItem('access_token', accessToken);
      sessionStorage.setItem('refresh_token', refreshToken);
    }
  }

  saveAccessToken(accessToken: string) {
    sessionStorage.setItem('access_token', accessToken);
  }

  getAccessToken() : string | null {
    let token = sessionStorage.getItem('access_token');
    if (!token) {
      token = localStorage.getItem('access_token');
    }
    return token;
  }

  getResfreshToken() : string | null {
    let token = sessionStorage.getItem('refresh_token');
    if (!token) {
      token = localStorage.getItem('refresh_token');
    }
    return token;
  }


  refreshAccessToken():  Observable<any> {
    const refreshToken = this.getResfreshToken();
    const url = environment.baseURL + '/api/token/refresh/'
    const body = {
      "refresh" : refreshToken,
    };
    return this.http.post(url, body);
  }


  logout(): void {
    localStorage.removeItem('access_token');
    localStorage.removeItem('refresh_token');

    sessionStorage.removeItem('access_token');
    sessionStorage.removeItem('refresh_token');
  }
}
