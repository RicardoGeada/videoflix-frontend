import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterOutlet } from '@angular/router';
import { ErrorToastComponent } from './shared/components/error-toast/error-toast.component';
import { ErrorToastService } from './services/error-toast/error-toast.service';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule, RouterOutlet, ErrorToastComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent {
  title = 'videoflix-frontend';

  constructor(public errorToastService: ErrorToastService) {

  }
}
