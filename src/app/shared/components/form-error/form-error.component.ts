import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-form-error',
  standalone: true,
  imports: [],
  templateUrl: './form-error.component.html',
  styleUrl: './form-error.component.scss'
})
export class FormErrorComponent {

  @Input() errorType: string | null = null;

  getErrorMessage(): string {
    switch (this.errorType) {
      case 'required':
        return 'This field is required.';
      case 'email':
        return 'Invalid email address.';
      case 'passwordsMismatch':
        return 'Passwords must match.';
      default:
        return '';
    }
  }
}
