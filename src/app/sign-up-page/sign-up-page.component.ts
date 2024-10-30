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
import { FormInputComponent } from '../shared/components/form-input/form-input.component';
import { passwordsMatchValidator } from './validators/passwordsMatch.validator';
import { BackendApiService } from '../services/backend-api/backend-api.service';
import { FormService } from '../services/form/form.service';


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

  constructor(private fb: FormBuilder, private bs: BackendApiService, private formService: FormService) {
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
    const email = this.formService.getEmail();
    this.form.patchValue({ email });
  }



  onSubmit() {
    if (this.form.valid) {
      const email = this.form.get('email')?.value;
      const password = this.form.get('password')?.value;
      this.handleRegistration(email, password)

    } else {
      this.formService.validateAllFormFields(this.form);
    }
  }


  async handleRegistration(email: string, password: string) {
    try {
      const response = await this.bs.register(email, password);
      console.log(response);
    } catch (error) {
      console.error(error);
    }
  }

}
