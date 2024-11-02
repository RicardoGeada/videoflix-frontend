import { Component } from '@angular/core';
import { HeaderComponent } from '../shared/components/header/header.component';
import { FooterComponent } from '../shared/components/footer/footer.component';
import {
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { FormInputComponent } from '../shared/components/form-input/form-input.component';
import { BackendApiService } from '../services/backend-api/backend-api.service';
import { FormService } from '../services/form/form.service';
import { MessageToastService } from '../services/message-toast/message-toast.service';

@Component({
  selector: 'app-forgot-password-page',
  standalone: true,
  imports: [
    HeaderComponent,
    FooterComponent,
    ReactiveFormsModule,
    FormInputComponent,
  ],
  templateUrl: './forgot-password-page.component.html',
  styleUrl: './forgot-password-page.component.scss',
})
export class ForgotPasswordPageComponent {
  /**
   * Form group for handling form inputs.
   */
  form: FormGroup;

  /**
   * Constructor to inject services and initialize the form group.
   * @param fb - FormBuilder instance for creating the reactive form.
   * @param bs - BackendApiService for handling API requests.
   * @param formService - FormService for form validation utilities.
   * @param messageToastService - MessageToastService for displaying messages.
   */
  constructor(
    private fb: FormBuilder,
    private bs: BackendApiService,
    private formService: FormService,
    private messageToastService: MessageToastService
  ) {
    this.form = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
    });
  }

  /**
   * Handles form submission, triggers validation if the form is invalid,
   * otherwise initiates the forgot password process.
   */
  onSubmit() {
    if (this.form.valid) {
      const email = this.form.get('email')?.value;
      this.handleForgotPassword(email);
    } else {
      this.formService.validateAllFormFields(this.form);
    }
  }

  /**
   * Performs the forgot password request and handles the response or error.
   * @param email - The user's email address.
   */
  async handleForgotPassword(email: string) {
    try {
      const response: any = await this.bs.forgotPassword(email);
      console.log(response);
      this.messageToastService.setSuccess(response.detail);
    } catch (error: any) {
      console.log(error);
      this.messageToastService.setError(error.error.detail);
    }
  }
}
