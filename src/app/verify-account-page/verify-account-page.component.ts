import { Component } from '@angular/core';
import { HeaderComponent } from '../shared/components/header/header.component';
import { FooterComponent } from '../shared/components/footer/footer.component';
import { ActivatedRoute } from '@angular/router';
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

  /**
   * Constructor to inject services.
   * @param bs - BackendApiService for handling API requests.
   * @param route - ActivatedRoute for query parameter.
   */
  constructor(private route: ActivatedRoute, private bs: BackendApiService) {}

  ngOnInit() {
    // get uid and token
    this.uid = this.route.snapshot.queryParamMap.get('uid');
    this.token = this.route.snapshot.queryParamMap.get('token');

    // chek if url is valid
    if (this.uid && this.token) {
      this.isValidUrl = true;
      this.handleVerifyAccount(this.uid, this.token);
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
