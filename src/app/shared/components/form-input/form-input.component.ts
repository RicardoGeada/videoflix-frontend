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
  @Input() type: string = 'text';
  @Input() placeholder: string = '';

  @Input() passwordImgSrc : string = 'visibility.svg';

  getErrorType(): string | null {
    const control = this.form.get(this.controlName);
    if (!control || !control.errors) return null;
    if (control.errors['required']) return 'required';
    if (control.errors['email']) return 'email';
    if (control.errors['passwordsMismatch']) return 'passwordsMismatch';
    return null;
  }


  togglePasswordVisibility(passwordInput : HTMLInputElement) {
    passwordInput.type == "password" ? passwordInput.type = "text" : passwordInput.type = "password";
    passwordInput.type == "password" ?  this.passwordImgSrc = "visibility.svg" :  this.passwordImgSrc = "visibility-off.svg";
  }
}
