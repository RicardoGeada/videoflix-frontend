import { Component, ElementRef, HostListener, ViewChild } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { VjsPlayerComponent } from './vjs-player/vjs-player.component';
import { BreakpointService } from '../services/breakpoint/breakpoint.service';

@Component({
  selector: 'app-videoplayer-page',
  standalone: true,
  imports: [FormsModule, VjsPlayerComponent],
  templateUrl: './videoplayer-page.component.html',
  styleUrl: './videoplayer-page.component.scss'
})
export class VideoplayerPageComponent {

  isMobile: boolean = false;

  constructor(private breakpointService: BreakpointService) {}

  ngOnInit(): void {
    this.breakpointService.isMobile().subscribe(result => {
      this.isMobile = result.matches;
    })
  }

}
