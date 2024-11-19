import { Component } from '@angular/core';
import { HeaderComponent } from '../shared/components/header/header.component';
import { FooterComponent } from '../shared/components/footer/footer.component';
import { ReactiveFormsModule } from '@angular/forms';
import {
  AbstractControlOptions,
  FormBuilder,
  FormGroup,
  Validators,
} from '@angular/forms';
import { FormInputComponent } from '../shared/components/form-input/form-input.component';
import { passwordsMatchValidator } from './validators/passwordsMatch.validator';
import { BackendApiService } from '../services/backend-api/backend-api.service';
import { FormService } from '../services/form/form.service';
import { MessageToastService } from '../services/message-toast/message-toast.service';
import { Router } from '@angular/router';



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
  constructor(private fb: FormBuilder, private bs: BackendApiService, private formService: FormService, private messageToastService: MessageToastService, private router: Router) {
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


  ngOnInit() {
    this.prefillEmailFieldFromService();
  }


  /**
   * Get Email from FormService and transfer its value to the email field.
   */
  prefillEmailFieldFromService() {
    const email = this.formService.getEmail();
    this.form.patchValue({ email });
  }


  /**
   * Handles form submission, triggers validation if the form is invalid,
   * otherwise initiates the registration process.
   */
  async onSubmit() {
    if (this.form.valid) {
      const email = this.form.get('email')?.value;
      const password = this.form.get('password')?.value;
      await this.handleRegistration(email, password);
      this.form.reset();
      this.router.navigate(['/login']);
    } else {
      this.formService.validateAllFormFields(this.form);
    }
  }


  /**
   * Performs the registration request and handles the response or error.
   * @param email - The user's email address.
   * @param password - The user's password.
   */
  async handleRegistration(email: string, password: string) {
    try {
      const response = await this.bs.register(email, password);
      console.log(response);
      this.messageToastService.setSuccess('Registration success. Please check your email to complete the registration.')
    } catch (error: any) {
      console.error(error);
      this.messageToastService.setError('Registration failed. Please check your inputs and try again.')
    }
  }

}
