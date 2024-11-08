import { Component } from '@angular/core';
import { HeaderComponent } from '../shared/components/header/header.component';
import { FooterComponent } from '../shared/components/footer/footer.component';
import {
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { Router } from '@angular/router';
import { FormService } from '../services/form/form.service';
import { AuthService } from '../services/auth/auth.service';

@Component({
  selector: 'app-home-page',
  standalone: true,
  imports: [HeaderComponent, FooterComponent, ReactiveFormsModule],
  templateUrl: './home-page.component.html',
  styleUrl: './home-page.component.scss',
})
export class HomePageComponent {
  form: FormGroup;

  constructor(
    private fb: FormBuilder,
    private router: Router,
    private formService: FormService,
    private as: AuthService
  ) {
    this.form = this.fb.group({
      email: ['', [Validators.email]],
    });
  }

  /**
   * Lifecycle hook to check for an existing access token on component initialization.
   * Handle automatic login.
   */
  ngOnInit() {
    if (this.as.getAccessToken()) {
      this.router.navigate(['/browse']);
    }
  }


  /**
   * Handles form submission, stores email and navigates to signup page.
   */
  onSubmit() {
    // store email for prefill
    const email = this.form.get('email')?.value;
    this.formService.setEmail(email);
    // navigate to signup
    this.router.navigate(['/signup']);
  }
}
