import { Component } from '@angular/core';
import { HeaderComponent } from '../shared/components/header/header.component';
import { FooterComponent } from '../shared/components/footer/footer.component';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { FormInputComponent } from '../shared/components/form-input/form-input.component';
import { Router } from '@angular/router';
import { FormService } from '../services/form/form.service';

@Component({
  selector: 'app-home-page',
  standalone: true,
  imports: [HeaderComponent, FooterComponent, ReactiveFormsModule, FormInputComponent],
  templateUrl: './home-page.component.html',
  styleUrl: './home-page.component.scss'
})
export class HomePageComponent {

  form: FormGroup;

  constructor(private fb: FormBuilder, private router: Router, private formService: FormService) {
    this.form = this.fb.group(
      {
        email: ['', [Validators.email]],
      },
    );
  }

  onSubmit() {
      // store email for prefill
      const email = this.form.get('email')?.value;
      this.formService.setEmail(email);
      // navigate to signup
      this.router.navigate(['/signup']);
  }

}
