import { Component } from '@angular/core';
import { HeaderComponent } from '../shared/components/header/header.component';
import { environment } from '../../environments/environment.development';

@Component({
  selector: 'app-privacy-policy',
  standalone: true,
  imports: [HeaderComponent],
  templateUrl: './privacy-policy.component.html',
  styleUrl: './privacy-policy.component.scss'
})
export class PrivacyPolicyComponent {

  name = environment.imprintName;

}
