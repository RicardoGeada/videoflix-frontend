import {
  Component,
  ElementRef,
  EventEmitter,
  Input,
  Output,
  ViewChild,
  ViewEncapsulation,
} from '@angular/core';
import videojs from 'video.js';
import Player from 'video.js/dist/types/player';

@Component({
  selector: 'app-vjs-player',
  standalone: true,
  imports: [],
  templateUrl: './vjs-player.component.html',
  styleUrl: './vjs-player.component.scss',
  encapsulation: ViewEncapsulation.None,
})
export class VjsPlayerComponent {
  @ViewChild('target', { static: true }) target!: ElementRef;

  // See options: https://videojs.com/guides/options

  @Input() video!: any;

  defaultOptions = {
    fluid: true,
    aspectRatio: '16:9',
    autoplay: false,
    controls: true,
    controlBar: {
      subsCapsButton: true,
      playbackRateMenuButton: true,
      durationDisplay: true,
      progressControl: true,
      remainingTimeDisplay: true,
      currentTimeDisplay: true,
      timeDivider: true,
      fullscreenToggle: true,
      pictureInPictureToggle: false,
    },
    playbackRates: [0.5, 1, 1.5, 2],
  };

  player!: Player;

  @Output() userActivityChange = new EventEmitter<boolean>();

  constructor(private elementRef: ElementRef) {}

  // Instantiate a Video.js player OnInit
  ngOnInit() {
    this.player = videojs(
      this.target.nativeElement,
      this.options,
      function onPlayerReady() {
        console.log('onPlayerReady', this);
      }
    );

    this.player.on('useractive', () => {
      this.userActivityChange.emit(true);  // Aktiv
    });
    this.player.on('userinactive', () => {
      this.userActivityChange.emit(false); // Inaktiv
    });

    this.addCustomButtons();
    this.addVideoTitle();
  }

  // Dispose the player OnDestroy
  ngOnDestroy() {
    if (this.player) {
      this.player.dispose();
    }
  }

   get options() {
    const sources = {
      src: this.video.video_url,
      type: 'application/vnd.apple.mpegurl',
    };

    return {
      ...this.defaultOptions,
      sources: sources,
      tracks: [],
    };
  }

  addCustomButtons() {
    this.addRewindButton();
    this.addForwardButton();
  }

  addRewindButton() {
    const Button = videojs.getComponent('Button');

    class RewindButton extends Button {
      constructor(player: Player, options?: any) {
        super(player, options);
        this.addClass('vjs-rewind-button');
      }

      handleClick() {
        const currentTime = this.player().currentTime();
        if (currentTime) this.player().currentTime(currentTime - 10); // Rewind 10 seconds
      }
    }

    // register button in video.js
    videojs.registerComponent('RewindButton', RewindButton);

    // add button to control bar
    this.player.ready(() => {
      this.player
        .getChild('controlBar')!
        .addChild('RewindButton', { controlText: '10 seconds back' }, 1);
    });
  }

  addForwardButton() {
    const Button = videojs.getComponent('Button');

    class ForwardButton extends Button {
      constructor(player: Player, options?: any) {
        super(player, options);
        this.addClass('vjs-forward-button');
      }

      handleClick() {
        const currentTime = this.player().currentTime() || 0;
        this.player().currentTime(currentTime + 10); // Forward 10 seconds
      }
    }

    // register button in video.js
    videojs.registerComponent('ForwardButton', ForwardButton);

    // add button to control bar
    this.player.ready(() => {
      this.player
        .getChild('controlBar')!
        .addChild('ForwardButton', { controlText: '10 seconds forward' }, 2);
    });
  }

  addVideoTitle() {
    const Component = videojs.getComponent('Component');

    class VideoTitle extends Component {
      constructor(player: Player, options: any) {
        super(player, options);
        this.addClass('vjs-video-title');
        this.el_.innerHTML = options.title || 'Untitled Video';
      }
    }

    videojs.registerComponent('VideoTitle', VideoTitle);

    this.player.ready(() => {
      const videoTitle = this.video.title || 'Untitled Video';
      this.player
        .getChild('controlBar')!
        .addChild('VideoTitle', { title: videoTitle }, 6);
    });
  }
}
