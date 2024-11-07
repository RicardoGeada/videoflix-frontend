import { Component, ElementRef, ViewChild } from '@angular/core';
import { ContentService } from '../../services/content/content.service';
import Player from 'video.js/dist/types/player';
import videojs from 'video.js';
import { Router } from '@angular/router';
import { Video } from '../../shared/interfaces/video';

@Component({
  selector: 'app-billboard',
  standalone: true,
  imports: [],
  templateUrl: './billboard.component.html',
  styleUrl: './billboard.component.scss',
})
export class BillboardComponent {
  @ViewChild('target', { static: true }) target!: ElementRef;

  video: Video = {
    id: 0,
    created_at: '',
    title: '',
    description: '',
    genres: [],
    thumbnail_url: '',
    video_url: '',
  };

  defaultOptions = {
    fluid: true,
    aspectRatio: '16:9',
    controls: false,
    autoplay: false,
  };

  player!: Player;

  maxPlayTime: number = 5;

  constructor(private contentService: ContentService, private router: Router) {}

  /**
   * Gets the configuration options for the video player.
   *
   * @readonly
   * @type {Object}
   */
  get options() {
    const sources = {
      src: this.video.video_url,
      type: 'application/vnd.apple.mpegurl',
    };

    return {
      ...this.defaultOptions,
      sources: sources,
    };
  }

  /**
   * Angular lifecycle hook that runs after the component is initialized.
   * Loads the video and initializes the video.js player.
   *
   * @async
   * @returns {Promise<void>}
   */
  async ngOnInit(): Promise<void> {
    await this.loadBillboardVideo();
    // setup videojs player
    this.player = videojs(
      this.target.nativeElement,
      this.options,
      function onPlayerReady() {
        console.log('onPlayerReady', this);
      }
    );
  }

  /**
   * Angular lifecycle hook that runs when the component is destroyed.
   * Cleans up the video.js player instance.
   */
  ngOnDestroy() {
    if (this.player) {
      this.player.dispose();
    }
  }

  /**
   * Plays the video and limits the playback to `maxPlayTime` seconds.
   */
  playVideo() {
    const video = this.target.nativeElement;
    video.play();

    // only play maxPlayTime in seconds
    video.addEventListener('timeupdate', () => {
      if (video.currentTime >= this.maxPlayTime) {
        video.pause();
        video.currentTime = 0;
      }
    });
  }

  /**
   * Stops the video and resets the playback position to the start.
   */
  stopVideo() {
    const video = this.target.nativeElement;
    video.pause();
    video.currentTime = 0;
  }

  /**
   * Loads the billboard video data from the content service.
   *
   * @async
   * @returns {Promise<void>}
   */
  async loadBillboardVideo(): Promise<void> {
    try {
      const response: any = await this.contentService.getBillboardVideo();
      this.video = response;
      console.log(response);
    } catch (error) {
      console.error(error);
    }
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
