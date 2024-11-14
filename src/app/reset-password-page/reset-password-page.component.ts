import { Component } from '@angular/core';
import { HeaderComponent } from '../shared/components/header/header.component';
import { FooterComponent } from '../shared/components/footer/footer.component';
import {
  AbstractControlOptions,
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { FormInputComponent } from '../shared/components/form-input/form-input.component';
import { passwordsMatchValidator } from '../sign-up-page/validators/passwordsMatch.validator';
import { ActivatedRoute, Router } from '@angular/router';
import { BackendApiService } from '../services/backend-api/backend-api.service';
import { FormService } from '../services/form/form.service';
import { MessageToastService } from '../services/message-toast/message-toast.service';

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
  /**
   * Form group for handling form inputs.
   */
  form: FormGroup;

  uid: string | null = '';
  token: string | null = '';
  isValidUrl: boolean = false;

  /**
   * Constructor to inject services and initialize the form group.
   * @param fb - FormBuilder instance for creating the reactive form.
   * @param bs - BackendApiService for handling API requests.
   * @param route - ActivatedRoute for query parameters.
   * @param formService - FormService for form validation utilities.
   * @param messageToastService - MessageToastService for displaying messages.
   */
  constructor(
    private fb: FormBuilder,
    private bs: BackendApiService,
    private route: ActivatedRoute,
    private formService: FormService,
    private messageToastService: MessageToastService
  ) {
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
    // get uid and token
    this.uid = this.route.snapshot.queryParamMap.get('uid');
    this.token = this.route.snapshot.queryParamMap.get('token');

    // check if url is valid
    if (this.uid && this.token) {
      this.isValidUrl = true;
    }
  }


  ngAfterViewInit() {
    // show invalid link error if url is invalid
    if (!this.isValidUrl) {
      setTimeout(() => {
        this.messageToastService.setError('Invalid link.');
      });
    }
  }


  /**
   * Handles form submission, triggers validation if the form is invalid,
   * otherwise initiates the reset password process.
   */
  onSubmit() {
    if (this.form.valid && this.isValidUrl) {
      const password = this.form.get('password')?.value;
      this.handleResetPassword(password);
    } else {
      this.formService.validateAllFormFields(this.form);
    }
  }


  /**
   * Performs the reset password request and handles the response or error.
   * @param password - The user's new password.
   */
  async handleResetPassword(password: string) {
    try {
      const response: any = await this.bs.resetPassword(
        password,
        this.uid!,
        this.token!
      );
      console.log(response);
      this.messageToastService.setSuccess(
        'The password has been successfully reset.'
      );
    } catch (error: any) {
      console.error(error);
      this.messageToastService.setError(
        'Invalid link. Please request a new link.'
      );
    }
  }
}
