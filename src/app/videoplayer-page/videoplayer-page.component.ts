import { Component, ElementRef, HostListener, ViewChild } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { VjsPlayerComponent } from './vjs-player/vjs-player.component';
import { BreakpointService } from '../services/breakpoint/breakpoint.service';
import { ContentService } from '../services/content/content.service';
import { ActivatedRoute } from '@angular/router';
import { Video } from '../shared/interfaces/video';
import { LoaderService } from '../services/loader/loader.service';

@Component({
  selector: 'app-videoplayer-page',
  standalone: true,
  imports: [FormsModule, VjsPlayerComponent],
  templateUrl: './videoplayer-page.component.html',
  styleUrl: './videoplayer-page.component.scss',
})
export class VideoplayerPageComponent {
  isMobile: boolean = false;

  videoId: string | null = null;
  video: Video = {
    id: 0,
    created_at: '',
    title: '',
    description: '',
    genres: [],
    thumbnail_url: '',
    video_url: '',
  };

  isUserActive = true;

  /**
   * Creates an instance of VideoplayerPageComponent.
   *
   * @param {BreakpointService} breakpointService - Service for detecting screen size changes and responsive adjustments.
   * @param {ContentService} contentService - Service for retrieving video details.
   * @param {ActivatedRoute} route - Activated route for accessing route parameters.
   */
  constructor(
    private breakpointService: BreakpointService,
    private contentService: ContentService,
    private route: ActivatedRoute,
    private loaderService: LoaderService,
  ) {}

  /**
   * Angular lifecycle hook that runs after the component is initialized.
   * Checks if the layout should adjust for mobile devices and loads video details based on the route parameters.
   */
  ngOnInit(): void {
    this.breakpointService.isMobile().subscribe((result) => {
      this.isMobile = result.matches;
    });
    this.videoId = this.route.snapshot.paramMap.get('id');
    this.loadVideo();
  }

  /**
   * Loads video details from the content service based on the video ID.
   * Updates the `video` property with the retrieved data.
   *
   * @async
   * @returns {Promise<void>}
   */
  async loadVideo(): Promise<void> {
    if (this.videoId) {
      try {
        this.loaderService.start();
        const response: any = await this.contentService.getVideo(this.videoId);
        console.log(response);
        this.video = response || {};
      } catch (error) {
        console.error(error);
      } finally {
        this.loaderService.stop();
      }
    }
  }
}
