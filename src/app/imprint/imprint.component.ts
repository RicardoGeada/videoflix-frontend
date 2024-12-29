import { Component } from '@angular/core';
import { HeaderComponent } from '../shared/components/header/header.component';
import { environment } from '../../environments/environment';

@Component({
  selector: 'app-imprint',
  standalone: true,
  imports: [HeaderComponent],
  templateUrl: './imprint.component.html',
  styleUrl: './imprint.component.scss'
})
export class ImprintComponent {

  name = environment.imprintName;
  street = environment.imprintStreet;
  city = environment.imprintCity;
  phone = environment.imprintPhone;
  email = environment.imprintEmail;
}
