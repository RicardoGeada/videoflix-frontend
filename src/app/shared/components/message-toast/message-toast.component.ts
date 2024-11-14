import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';
import { MessageToastService } from '../../../services/message-toast/message-toast.service';
import { NavigationStart, Router } from '@angular/router';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-message-toast',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './message-toast.component.html',
  styleUrl: './message-toast.component.scss',
})
export class MessageToastComponent {
  @Input() button:
    | {
        name: string;
        function: () => void;
      }
    | undefined;

    response: {
      message: string;
      type: 'error' | 'success';
    }

  isVisible: boolean = false;
  private routerSubscription: Subscription;

  constructor(public messageToastService: MessageToastService, private router: Router) {
    this.response = this.messageToastService.response;
    this.routerSubscription = this.router.events.subscribe((event) => {
      if (event instanceof NavigationStart) {
        this.messageToastService.response.message = '';
      }
    });
  }

  ngOnInit() {
    setTimeout(() => {
      this.isVisible = true;
    }, 50);
    setTimeout(() => {
      this.close();
    }, 2500)
  }

  close() {
    this.isVisible = false;
    setTimeout(() => {
      this.messageToastService.response.message = '';
    }, 500);
  }
}
