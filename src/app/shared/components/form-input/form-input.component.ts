import { Component, Input } from '@angular/core';
import { FormGroup, ReactiveFormsModule } from '@angular/forms';
import { FormErrorComponent } from '../form-error/form-error.component';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-form-input',
  standalone: true,
  imports: [FormErrorComponent, ReactiveFormsModule, CommonModule],
  templateUrl: './form-input.component.html',
  styleUrl: './form-input.component.scss'
})
export class FormInputComponent {
  @Input() form!: FormGroup;
  @Input() controlName!: string;
  @Input() type: 'text' | 'password' | 'email' = 'text';
  @Input() placeholder: string = '';
  patternValue: string = '';

  @Input() passwordImgSrc : string = 'visibility.svg';


  ngOnInit() {
    if (this.type == 'password' && this.controlName == 'password') {
      this.patternValue = '^(?=.*[a-z])(?=.*[A-Z])(?=.*\\d)(?=.*[@$!%*?&])[A-Za-z\\d@$!%*?&]{8,}$';
    }
  }

  getErrorType(): string | null {
    const control = this.form.get(this.controlName);
    console.log('error', control?.errors);
    if (!control || !control.errors) return null;
    if (control.errors['required']) return 'required';
    if (control.errors['email']) return 'email';
    if (control.errors['passwordsMismatch']) return 'passwordsMismatch';
    if (control.errors['pattern']) return 'pattern';
    return null;
  }


  togglePasswordVisibility(passwordInput : HTMLInputElement) {
    passwordInput.type == "password" ? passwordInput.type = "text" : passwordInput.type = "password";
    passwordInput.type == "password" ?  this.passwordImgSrc = "visibility.svg" :  this.passwordImgSrc = "visibility-off.svg";
  }
}
