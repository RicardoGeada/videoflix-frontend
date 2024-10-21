import { Component } from '@angular/core';
import { HeaderComponent } from '../shared/components/header/header.component';
import { FooterComponent } from '../shared/components/footer/footer.component';
import {
  AbstractControlOptions,
  FormBuilder,
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { FormInputComponent } from '../shared/components/form-input/form-input.component';
import { passwordsMatchValidator } from '../sign-up-page/validators/passwordsMatch.validator';
import { ActivatedRoute, Router } from '@angular/router';
import { BackendApiService } from '../services/backend-api/backend-api.service';

@Component({
  selector: 'app-reset-password-page',
  standalone: true,
  imports: [
    HeaderComponent,
    FooterComponent,
    ReactiveFormsModule,
    FormInputComponent,
  ],
  templateUrl: './reset-password-page.component.html',
  styleUrl: './reset-password-page.component.scss',
})
export class ResetPasswordPageComponent {
  form: FormGroup;

  uid: string | null = '';
  token: string | null  = '';
  isValidUrl: boolean = true;

  constructor(private fb: FormBuilder, private bs: BackendApiService, private activeRoute: ActivatedRoute, private router: Router) {
    this.form = this.fb.group(
      {
        password: ['', [Validators.required]],
        confirmPassword: ['', [Validators.required]],
      },
      {
        validator: passwordsMatchValidator('password', 'confirmPassword'),
      } as AbstractControlOptions
    );
  }

  ngOnInit() {
    this.uid = this.activeRoute.snapshot.queryParamMap.get('uid');
    this.token = this.activeRoute.snapshot.queryParamMap.get('token');

    if (!this.uid || !this.token) {
      this.isValidUrl = false;
    }
  }

  onSubmit() {
    if (this.form.valid && this.isValidUrl) {
      const password = this.form.get('password')?.value;
      this.handleResetPassword(password)
    } else {
      this.validateAllFormFields(this.form);
    }
  }

  async handleResetPassword(password: string) {
    try {
      const response : any = await this.bs.resetPassword(password, this.uid!, this.token!);
      console.log(response);
      this.router.navigate(['/login']);
    } catch (error) {
      console.log(error)
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
