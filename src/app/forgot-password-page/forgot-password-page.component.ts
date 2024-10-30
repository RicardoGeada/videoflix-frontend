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
import { BackendApiService } from '../services/backend-api/backend-api.service';

@Component({
  selector: 'app-forgot-password-page',
  standalone: true,
  imports: [HeaderComponent, FooterComponent, ReactiveFormsModule, FormInputComponent],
  templateUrl: './forgot-password-page.component.html',
  styleUrl: './forgot-password-page.component.scss'
})
export class ForgotPasswordPageComponent {

  form: FormGroup;

  constructor(private fb: FormBuilder, private bs: BackendApiService) {
    this.form = this.fb.group(
      {
        email: ['', [Validators.required, Validators.email]],
      },
    );
  }

  onSubmit() {
    if (this.form.valid) {
      const email = this.form.get('email')?.value;
      this.handleForgotPassword(email)
    } else {
      this.validateAllFormFields(this.form);
    }
  }


  async handleForgotPassword(email: string) {
    	try {
        const response : any = await this.bs.forgotPassword(email);
        console.log(response);
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
