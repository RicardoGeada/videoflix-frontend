import { Injectable } from '@angular/core';
import { environment } from '../../../environments/environment.development';
import { HttpClient } from '@angular/common/http';
import { lastValueFrom } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class BackendApiService {

  constructor(private http: HttpClient) { }

  register(email: string, password: string) {
    const url = environment.baseURL + '/api/register/'
    const body = {
      "email" : email,
      "password" : password,
    };
    return lastValueFrom(this.http.post(url, body))
  }


  verifyAccount(uid: string, token: string) {
    const url = environment.baseURL + '/api/activate/'
    const body = {
      "uidb64": uid,
      "token": token,
    };
    return lastValueFrom(this.http.post(url, body))
  }


  login(email: string, password: string) {
    const url = environment.baseURL + '/api/login/'
    const body = {
      "email" : email,
      "password" : password,
    };
    return lastValueFrom(this.http.post(url, body))
  }

  
  forgotPassword(email: string) {
    const url = environment.baseURL + '/api/password-reset/'
    const body = {
      "email" : email,
    };
    return lastValueFrom(this.http.post(url, body))
  }

  
  resetPassword(newpassword: string, uid: string, token: string) {
    const url = environment.baseURL + '/api/password-reset-confirm/'
    const body = {
      "uidb64": uid,
      "token": token,
      "new_password" : newpassword,
    };
    return lastValueFrom(this.http.post(url, body))
  }


}
