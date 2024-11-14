import { Injectable } from '@angular/core';
import { environment } from '../../../environments/environment.development';
import { HttpClient } from '@angular/common/http';
import { lastValueFrom } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class BackendApiService {

  constructor(private http: HttpClient) { }

  /**
   * Registers a new user with email and password.
   *
   * @param {string} email - The user's email address.
   * @param {string} password - The user's password.
   * @returns {Promise<any>} A promise with the backend response.
   */
  register(email: string, password: string): Promise<any> {
    const url = environment.baseURL + '/api/register/';
    const body = {
      "email" : email,
      "password" : password,
    };
    return lastValueFrom(this.http.post(url, body))
  }


  /**
   * Verifies the user's account using a unique ID and token.
   *
   * @param {string} uid - The unique user ID in base64 format.
   * @param {string} token - The verification token provided in the confirmation email.
   * @returns {Promise<any>} A promise with the backend response.
   */
  verifyAccount(uid: string, token: string): Promise<any> {
    const url = environment.baseURL + '/api/activate/';
    const body = {
      "uidb64": uid,
      "token": token,
    };
    return lastValueFrom(this.http.post(url, body))
  }



  /**
   * Logs in a user with their email and password.
   *
   * @param {string} email - The user's email address.
   * @param {string} password - The user's password.
   * @returns {Promise<any>} A promise with the backend response.
   */
  login(email: string, password: string): Promise<any> {
    const url = environment.baseURL + '/api/login/';
    const body = {
      "email" : email,
      "password" : password,
    };
    return lastValueFrom(this.http.post(url, body))
  }

  
  /**
   * Sends a password reset request to the backend for a given email.
   *
   * @param {string} email - The email address of the user requesting password reset.
   * @returns {Promise<any>} A promise with the backend response.
   */
  forgotPassword(email: string): Promise<any> {
    const url = environment.baseURL + '/api/password-reset/';
    const body = {
      "email" : email,
    };
    return lastValueFrom(this.http.post(url, body))
  }

  
  /**
   * Resets the user's password using a new password, unique ID, and token.
   *
   * @param {string} newpassword - The user's new password.
   * @param {string} uid - The unique user ID in base64 format.
   * @param {string} token - The reset token provided in the password reset email.
   * @returns {Promise<any>} A promise with the backend response.
   */
  resetPassword(newpassword: string, uid: string, token: string): Promise<any> {
    const url = environment.baseURL + '/api/password-reset-confirm/';
    const body = {
      "uidb64": uid,
      "token": token,
      "new_password" : newpassword,
    };
    return lastValueFrom(this.http.post(url, body))
  }


}
