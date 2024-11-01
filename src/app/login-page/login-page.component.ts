import { Component } from '@angular/core';
import { HeaderComponent } from '../shared/components/header/header.component';
import { FooterComponent } from '../shared/components/footer/footer.component';
import { BackendApiService } from '../services/backend-api/backend-api.service';
import { FormInputComponent } from '../shared/components/form-input/form-input.component';
import { FormBuilder, FormControl, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../services/auth/auth.service';
import { FormService } from '../services/form/form.service';
import { ErrorToastComponent } from '../shared/components/error-toast/error-toast.component';
import { ErrorToastService } from '../services/error-toast/error-toast.service';

@Component({
  selector: 'app-login-page',
  standalone: true,
  imports: [HeaderComponent, FooterComponent, FormInputComponent, ReactiveFormsModule, ErrorToastComponent],
  templateUrl: './login-page.component.html',
  styleUrl: './login-page.component.scss'
})
export class LoginPageComponent {

  form: FormGroup;

  constructor(private fb: FormBuilder, private bs: BackendApiService, private router: Router, private as: AuthService, private formService: FormService, public errorToastService: ErrorToastService) {
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
      this.formService.validateAllFormFields(this.form);
    }
  }


  async handleLogin(email: string, password: string, rememberMe: boolean) {
    try {
      const response : any = await this.bs.login(email, password);
      this.as.saveTokens(response['access'], response['refresh'], rememberMe);  
      console.log(response);
      this.router.navigate(['/browse']);
    } catch (error: any) {
      console.error(error);
      this.errorToastService.errorMessage = error.error.detail;
    }
  }

}
