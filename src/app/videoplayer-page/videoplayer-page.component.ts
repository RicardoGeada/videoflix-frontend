import { Component, ElementRef, HostListener, ViewChild } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { VjsPlayerComponent } from './vjs-player/vjs-player.component';
import { BreakpointService } from '../services/breakpoint/breakpoint.service';
import { ContentService } from '../services/content/content.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-videoplayer-page',
  standalone: true,
  imports: [FormsModule, VjsPlayerComponent],
  templateUrl: './videoplayer-page.component.html',
  styleUrl: './videoplayer-page.component.scss'
})
export class VideoplayerPageComponent {

  isMobile: boolean = false;

  videoId: string | null = null;
  video: any;

  isUserActive = true;

  constructor(private breakpointService: BreakpointService, private contentService: ContentService, private route: ActivatedRoute) {}

  ngOnInit(): void {
    this.breakpointService.isMobile().subscribe(result => {
      this.isMobile = result.matches;
    });
    this.videoId = this.route.snapshot.paramMap.get('id');
    this.loadVideo();
  }

  async loadVideo() {
    if (this.videoId) {
      try {
        const response : any = await this.contentService.getVideo(this.videoId);
        console.log(response);
        this.video = response || {};
      } catch (error) {
        console.error(error);
      }
    }
  }

}
