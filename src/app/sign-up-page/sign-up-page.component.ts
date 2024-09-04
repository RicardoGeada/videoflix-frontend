import { Component } from '@angular/core';
import { HeaderComponent } from '../shared/components/header/header.component';
import { FooterComponent } from '../shared/components/footer/footer.component';

import { ReactiveFormsModule } from '@angular/forms';
import { AbstractControlOptions, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { passwordsMatchValidator } from './validators/passwordsMatch.validator';

@Component({
  selector: 'app-sign-up-page',
  standalone: true,
  imports: [HeaderComponent, FooterComponent, ReactiveFormsModule],
  templateUrl: './sign-up-page.component.html',
  styleUrl: './sign-up-page.component.scss'
})
export class SignUpPageComponent {

  passwordImageSource = { value: "visibility.svg" };
  confirmPasswordImageSource = { value: "visibility.svg" };

  form: FormGroup;

  constructor(private fb: FormBuilder) {
    this.form = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required]],
      confirmPassword: ['', [Validators.required]]
    }, {
      validator: passwordsMatchValidator('password', 'confirmPassword')
    } as AbstractControlOptions);
  }


  togglePasswordVisibility(passwordInput : HTMLInputElement) {
    let imgSrc = passwordInput.id == "password" ? this.passwordImageSource : this.confirmPasswordImageSource;
    passwordInput.type == "password" ? passwordInput.type = "text" : passwordInput.type = "password";
    passwordInput.type == "password" ?  imgSrc.value = "visibility.svg" :  imgSrc.value = "visibility-off.svg";
  }


  passwordsMismatch() {
    const confirmPasswordControl = this.form.get('confirmPassword');
    if (confirmPasswordControl) {
      return confirmPasswordControl.hasError('passwordsMismatch') && confirmPasswordControl.touched
    } else {
      return false;
    }
  }

  onSubmit() {

  }

}
