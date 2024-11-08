import { Injectable } from '@angular/core';
import { environment } from '../../../environments/environment.development';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private http: HttpClient,  private router: Router) { }


  /**
   * Saves the access and refresh tokens in either local storage or session storage
   * based on the `rememberMe` preference.
   *
   * @param {string} accessToken - The access token for user authentication.
   * @param {string} refreshToken - The refresh token for refreshing the access token.
   * @param {boolean} rememberMe - If true, tokens are stored in local storage;
   * otherwise, they are stored in session storage.
   */
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


   /**
   * Saves a new access token to session storage.
   *
   * @param {string} accessToken - The new access token to save.
   */
  saveAccessToken(accessToken: string) {
    sessionStorage.setItem('access_token', accessToken);
  }


  /**
   * Retrieves the current access token, checking session storage first,
   * and then local storage if not found in session storage.
   *
   * @returns {string | null} The access token if found; otherwise, null.
   */
  getAccessToken() : string | null {
    let token = sessionStorage.getItem('access_token');
    if (!token) {
      token = localStorage.getItem('access_token');
    }
    return token;
  }


  /**
   * Retrieves the current refresh token, checking session storage first,
   * and then local storage if not found in session storage.
   *
   * @returns {string | null} The refresh token if found; otherwise, null.
   */
  getResfreshToken() : string | null {
    let token = sessionStorage.getItem('refresh_token');
    if (!token) {
      token = localStorage.getItem('refresh_token');
    }
    return token;
  }



  /**
   * Sends a request to refresh the access token using the stored refresh token.
   *
   * @returns {Observable<any>} Observable containing the response from the refresh request.
   */
  refreshAccessToken():  Observable<any> {
    const refreshToken = this.getResfreshToken();
    const url = environment.baseURL + '/api/token/refresh/'
    const body = {
      "refresh" : refreshToken,
    };
    return this.http.post(url, body);
  }


  /**
   * Logs the user out by removing access and refresh tokens from both
   * local and session storage, and then navigates to the login page.
   */
  logout(): void {
    localStorage.removeItem('access_token');
    localStorage.removeItem('refresh_token');

    sessionStorage.removeItem('access_token');
    sessionStorage.removeItem('refresh_token');

    this.router.navigate(['/login']);
  }
}
