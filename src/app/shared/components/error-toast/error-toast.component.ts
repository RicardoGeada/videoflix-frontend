import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, Output } from '@angular/core';
import { ErrorToastService } from '../../../services/error-toast/error-toast.service';

@Component({
  selector: 'app-error-toast',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './error-toast.component.html',
  styleUrl: './error-toast.component.scss',
})
export class ErrorToastComponent {
  @Input() button:
    | {
        name: string;
        function: () => void;
      }
    | undefined;

  errorMessage: string = '';

  isVisible: boolean = false;

  constructor(public errorToastService: ErrorToastService) {
    this.errorMessage = this.errorToastService.errorMessage;
  }

  ngOnInit() {
    setTimeout(() => {
      this.isVisible = true;
    }, 50);
  }

  close() {
    this.isVisible = false;
    setTimeout(() => {
      this.errorToastService.errorMessage = '';
    }, 500);
  }
}
