import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterOutlet } from '@angular/router';
import { MessageToastComponent } from './shared/components/message-toast/message-toast.component';
import { MessageToastService } from './services/message-toast/message-toast.service';
import { LoaderComponent } from './shared/components/loader/loader.component';
import { LoaderService } from './services/loader/loader.service';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule, RouterOutlet, MessageToastComponent, LoaderComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent {
  title = 'videoflix-frontend';

  constructor(public messageToastService: MessageToastService, public loaderService: LoaderService) {

  }
}
