import { Component, Input } from '@angular/core';
import { AuthService } from '../../../services/auth/auth.service';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [],
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss'
})
export class HeaderComponent {

  constructor(public authService: AuthService) {}

  @Input() button: 'login' | 'logout' | null = null;
  @Input() position: 'absolute' | null = null;
}
