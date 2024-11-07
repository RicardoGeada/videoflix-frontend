import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { ContentService } from '../../services/content/content.service';
import { HeaderComponent } from '../../shared/components/header/header.component';
import { BreakpointService } from '../../services/breakpoint/breakpoint.service';
import { Video } from '../../shared/interfaces/video';

@Component({
  selector: 'app-video-detail',
  standalone: true,
  imports: [HeaderComponent],
  templateUrl: './video-detail.component.html',
  styleUrl: './video-detail.component.scss',
})
export class VideoDetailComponent {
  videoId: string | null = null;
  private routeSub!: Subscription;
  video: Video = {
    id: 0,
    created_at: '',
    title: '',
    description: '',
    genres: [],
    thumbnail_url: '',
    video_url: '',
  };

  isMobile: boolean = false;

  /**
   * Creates an instance of VideoDetailComponent.
   *
   * @param {ActivatedRoute} route - Activated route for accessing query parameters.
   * @param {Router} router - Router for navigation.
   * @param {ContentService} contentService - Service for retrieving video details.
   * @param {BreakpointService} breakpointService - Service for detecting screen size changes and responsive adjustments.
   */
  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private contentService: ContentService,
    private breakpointService: BreakpointService
  ) {}

  /**
   * Angular lifecycle hook that runs after the component is initialized.
   * Subscribes to query parameters for video ID and loads video details.
   * Also detects if the layout should adjust for mobile devices.
   */
  ngOnInit(): void {
    this.routeSub = this.route.queryParamMap.subscribe((params) => {
      this.videoId = params.get('vid');
      this.loadVideo();
    });

    this.breakpointService.isMobile().subscribe((result) => {
      this.isMobile = result.matches;
    });
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
        const response: any = await this.contentService.getVideo(this.videoId);
        console.log(response);
        this.video = response || {};
      } catch (error) {
        console.error(error);
      }
    }
  }

  /**
   * Closes the video detail view and navigates back to the browse page.
   */
  closeModal() {
    this.router.navigate(['/browse']);
  }

  /**
   * Angular lifecycle hook that runs when the component is destroyed.
   * Unsubscribes from route parameter updates.
   */
  ngOnDestroy(): void {
    this.routeSub.unsubscribe();
  }

  /**
   * Navigates to the video watch page based on the provided video ID.
   *
   * @param {number} id - The ID of the video to watch.
   */
  watchVideo(id: number) {
    this.router.navigate([`/watch/${id}`]);
  }
}
