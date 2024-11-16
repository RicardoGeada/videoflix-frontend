import { Component } from '@angular/core';
import { HeaderComponent } from '../shared/components/header/header.component';
import { FooterComponent } from '../shared/components/footer/footer.component';
import { ActivatedRoute, Router } from '@angular/router';
import { BackendApiService } from '../services/backend-api/backend-api.service';

@Component({
  selector: 'app-verify-account-page',
  standalone: true,
  imports: [HeaderComponent, FooterComponent,],
  templateUrl: './verify-account-page.component.html',
  styleUrl: './verify-account-page.component.scss'
})
export class VerifyAccountPageComponent {

  uid: string | null = '';
  token: string | null  = '';
  isValidUrl: boolean = false;
  countdown: number = 3;
  countdownInterval: any;

  /**
   * Constructor to inject services.
   * @param bs - BackendApiService for handling API requests.
   * @param route - ActivatedRoute for query parameter.
   */
  constructor(private route: ActivatedRoute, private bs: BackendApiService, private router: Router) {}

  async ngOnInit() {
    // get uid and token
    this.uid = this.route.snapshot.queryParamMap.get('uid');
    this.token = this.route.snapshot.queryParamMap.get('token');

    // chek if url is valid
    if (this.uid && this.token) {
      this.isValidUrl = true;
      await this.handleVerifyAccount(this.uid, this.token);
    }

    this.countdownInterval = setInterval(() => {
      if (this.countdown > 0) this.countdown--;
      else this.router.navigate(['/login'])
    }, 1000)
  }

  ngOnDestroy(): void {
    if (this.countdownInterval) {
      clearInterval(this.countdownInterval);
    }
  }


  /**
   * Performs the account verification request and handles the response or error.
   * @param password - The user's new password.
   */
  async handleVerifyAccount(uid: string, token: string) {
    try {
      const response : any = await this.bs.verifyAccount(uid, token);
      console.log(response);
    } catch (error) {
      this.isValidUrl = false;
      console.log(error)
    }
  }
}
