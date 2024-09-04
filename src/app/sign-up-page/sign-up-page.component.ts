import { Component } from '@angular/core';
import { HeaderComponent } from '../shared/components/header/header.component';
import { FooterComponent } from '../shared/components/footer/footer.component';

@Component({
  selector: 'app-sign-up-page',
  standalone: true,
  imports: [HeaderComponent, FooterComponent],
  templateUrl: './sign-up-page.component.html',
  styleUrl: './sign-up-page.component.scss'
})
export class SignUpPageComponent {

  passwordImageSource = { value: "visibility.svg" };
  confirmPasswordImageSource = { value: "visibility.svg" };

  togglePasswordVisibility(passwordInput : HTMLInputElement) {
    let imgSrc = passwordInput.id == "password" ? this.passwordImageSource : this.confirmPasswordImageSource;
    passwordInput.type == "password" ? passwordInput.type = "text" : passwordInput.type = "password";
    passwordInput.type == "password" ?  imgSrc.value = "visibility.svg" :  imgSrc.value = "visibility-off.svg";
  }

  

}
