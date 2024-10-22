import { Component } from '@angular/core';
import { HeaderComponent } from '../shared/components/header/header.component';
import { FooterComponent } from '../shared/components/footer/footer.component';
import { BackendApiService } from '../services/backend-api/backend-api.service';
import { FormInputComponent } from '../shared/components/form-input/form-input.component';
import { FormBuilder, FormControl, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../services/auth/auth.service';

@Component({
  selector: 'app-login-page',
  standalone: true,
  imports: [HeaderComponent, FooterComponent, FormInputComponent, ReactiveFormsModule],
  templateUrl: './login-page.component.html',
  styleUrl: './login-page.component.scss'
})
export class LoginPageComponent {
  form: FormGroup;

  constructor(private fb: FormBuilder, private bs: BackendApiService, private router: Router, private as: AuthService) {
    this.form = this.fb.group(
      {
        email: ['', [Validators.required, Validators.email]],
        password: ['', [Validators.required]],
        rememberMe: [false],
      },
    );
  }


  onSubmit() {
    if (this.form.valid) {
      const email = this.form.get('email')?.value;
      const password = this.form.get('password')?.value;
      const rememberMe = this.form.get('rememberMe')?.value;
      this.handleLogin(email, password, rememberMe);
    } else {
      this.validateAllFormFields(this.form);
    }
  }


  async handleLogin(email: string, password: string, rememberMe: boolean) {
    try {
      const response : any = await this.bs.login(email, password);
      this.as.saveTokens(response['access'], response['refresh'], rememberMe);  
      console.log(response);
      this.router.navigate(['/browse']);
    } catch (error) {
      console.error(error);
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
