import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor() { }

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

  getAccessToken() : string | null {
    let token = localStorage.getItem('access_token');
    if (!token) {
      token = sessionStorage.getItem('access_token');
    }
    return token;
  }

  getResfreshToken() : string | null {
    let token = localStorage.getItem('refresh_token');
    if (!token) {
      token = sessionStorage.getItem('refresh_token');
    }
    return token;
  }


  logout(): void {
    localStorage.removeItem('access_token');
    localStorage.removeItem('refresh_token');

    sessionStorage.removeItem('access_token');
    sessionStorage.removeItem('refresh_token');
  }
}
