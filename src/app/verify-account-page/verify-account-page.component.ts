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
  isValidUrl: boolean = true;

  constructor(private activeRoute: ActivatedRoute, private bs: BackendApiService) {}

  ngOnInit() {
    this.uid = this.activeRoute.snapshot.queryParamMap.get('uid');
    this.token = this.activeRoute.snapshot.queryParamMap.get('token');

    if (!this.uid || !this.token) {
      this.isValidUrl = false;
    } else {
      this.handleVerifyAccount(this.uid, this.token);
    }
  }

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
