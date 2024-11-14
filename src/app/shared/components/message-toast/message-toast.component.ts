import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';
import { MessageToastService } from '../../../services/message-toast/message-toast.service';

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

  constructor(public messageToastService: MessageToastService) {
    this.response = this.messageToastService.response;
  }

  ngOnInit() {
    setTimeout(() => {
      this.isVisible = true;
    }, 50);
  }

  close() {
    this.isVisible = false;
    setTimeout(() => {
      this.messageToastService.response.message = '';
    }, 500);
  }
}
