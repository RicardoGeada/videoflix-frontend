import { Component } from '@angular/core';
import { HeaderComponent } from '../shared/components/header/header.component';
import { FooterComponent } from '../shared/components/footer/footer.component';

import { FormControl, ReactiveFormsModule } from '@angular/forms';
import {
  AbstractControlOptions,
  FormBuilder,
  FormGroup,
  Validators,
} from '@angular/forms';
import { passwordsMatchValidator } from './validators/passwordsMatch.validator';
import { FormInputComponent } from '../shared/components/form-input/form-input.component';

@Component({
  selector: 'app-sign-up-page',
  standalone: true,
  imports: [
    HeaderComponent,
    FooterComponent,
    ReactiveFormsModule,
    FormInputComponent,
  ],
  templateUrl: './sign-up-page.component.html',
  styleUrl: './sign-up-page.component.scss',
})
export class SignUpPageComponent {
  form: FormGroup;

  constructor(private fb: FormBuilder) {
    this.form = this.fb.group(
      {
        email: ['', [Validators.required, Validators.email]],
        password: ['', [Validators.required]],
        confirmPassword: ['', [Validators.required]],
      },
      {
        validator: passwordsMatchValidator('password', 'confirmPassword'),
      } as AbstractControlOptions
    );
  }

  passwordsMismatch() {
    const confirmPasswordControl = this.form.get('confirmPassword');
    if (confirmPasswordControl) {
      return (
        confirmPasswordControl.hasError('passwordsMismatch') &&
        confirmPasswordControl.touched
      );
    } else {
      return false;
    }
  }

  onSubmit() {
    if (this.form.valid) {
      // submit
    } else {
      this.validateAllFormFields(this.form);
    }
  }

  
  validateAllFormFields(formGroup: FormGroup) {
    Object.keys(formGroup.controls).forEach((field) => {
      const control = formGroup.get(field);
      if (control instanceof FormControl) {
        control.markAsTouched({ onlySelf: true });
      } else if (control instanceof FormGroup) {
        this.validateAllFormFields(control);
      }
    });
  }
}
