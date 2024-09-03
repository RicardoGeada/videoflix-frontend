import { Component } from '@angular/core';
import { HeaderComponent } from '../shared/components/header/header.component';
import { FooterComponent } from '../shared/components/footer/footer.component';

@Component({
  selector: 'app-login-page',
  standalone: true,
  imports: [HeaderComponent, FooterComponent],
  templateUrl: './login-page.component.html',
  styleUrl: './login-page.component.scss'
})
export class LoginPageComponent {

  passwordImageSource = "visibility.svg"

  togglePasswordVisibility(passwordInput : HTMLInputElement) {
    passwordInput.type == "password" ? passwordInput.type = "text" : passwordInput.type = "password";
    passwordInput.type == "password" ? this.passwordImageSource = "visibility.svg" : this.passwordImageSource = "visibility-off.svg";

  }

}
