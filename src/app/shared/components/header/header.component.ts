import { Component, Input } from '@angular/core';
import { AuthService } from '../../../services/auth/auth.service';
import { Location } from '@angular/common';
import { Router } from '@angular/router';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [],
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss',
})
export class HeaderComponent {
  constructor(
    public authService: AuthService,
    private location: Location,
    private router: Router
  ) {}

  @Input() button: 'login' | 'logout' | 'back' | null = null;
  @Input() position: 'absolute' | null = null;

  /**
   * Navigates back to the previous page if it is within the same domain.
   * If the previous page is on a different domain, navigates to the homepage.
   */
  goBack() {
    const referrer = document.referrer; // Previous URL

    if (referrer && this.isSameDomain(referrer)) {
      this.location.back();
    } else {
      this.router.navigate(['/']);
    }
  }

  /**
   * Checks if a given URL belongs to the same domain as the current application.
   *
   * @private
   * @param {string} url - URL to check against the current domain.
   * @returns {boolean} True if the URL is on the same domain, false otherwise.
   */
  private isSameDomain(url: string): boolean {
    const link = document.createElement('a');
    link.href = url;
    return link.hostname === window.location.hostname;
  }
}
