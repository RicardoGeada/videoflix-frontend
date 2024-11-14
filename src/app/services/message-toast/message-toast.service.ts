import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class MessageToastService {
  
  response: {
    message: string;
    type: 'error' | 'success';
  } = {
    message: '',
    type: 'error',
  };

  constructor() {}

  setError(message: string = 'Oops, something went wrong') {
    this.response = {
      message: message || 'Oops, something went wrong',
      type: 'error',
    }
  }

  setSuccess(message: string) {
    this.response = {
      message: message,
      type: 'success',
    }
  }
}
