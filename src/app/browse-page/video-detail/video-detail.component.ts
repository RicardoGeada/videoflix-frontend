import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { ContentService } from '../../services/content/content.service';
import { HeaderComponent } from '../../shared/components/header/header.component';
import { BreakpointService } from '../../services/breakpoint/breakpoint.service';

@Component({
  selector: 'app-video-detail',
  standalone: true,
  imports: [HeaderComponent],
  templateUrl: './video-detail.component.html',
  styleUrl: './video-detail.component.scss'
})
export class VideoDetailComponent {

  videoId: string | null = null;
  private routeSub!: Subscription;
  video: any;

  isMobile: boolean = false;

  constructor(private route: ActivatedRoute, private router: Router, private contentService: ContentService, private breakpointService: BreakpointService) {}

  ngOnInit(): void {
    this.routeSub = this.route.queryParamMap.subscribe(params => {
      this.videoId = params.get('vid');
      this.loadVideo();
    })

    this.breakpointService.isMobile().subscribe(result => {
      this.isMobile = result.matches;
    })
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

  closeModal() {
    this.router.navigate(['/browse']);
  }

  ngOnDestroy(): void {
    this.routeSub.unsubscribe();
  }

  playVideo(id: string) {
    this.router.navigate([`/watch/${id}`])
  }
}
