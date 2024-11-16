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
import { Video } from '../../shared/interfaces/video';
import 'videojs-contrib-quality-levels';

interface PlayerWithQualityLevels extends Player {
  qualityLevels?: () => {
    length: number;
    [index: number]: {
      height: number;
      width: number;
      bitrate: number;
      enabled: boolean;
    };
    on: (event: string, callback: () => void) => void;
  };
}
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

  @Input() video: Video = {
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
    autoplay: true,
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

  player!: PlayerWithQualityLevels;

  @Output() userActivityChange = new EventEmitter<boolean>();

  constructor() {}

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

  /**
   * Angular lifecycle hook that initializes the Video.js player instance with configured options.
   * Sets up user activity event listeners and custom buttons (rewind, forward) and video title display.
   */
  ngOnInit() {
    this.player = videojs(
      this.target.nativeElement,
      this.options,
      function onPlayerReady() {
        console.log('onPlayerReady', this);
      }
    );
    this.setUpActivityEventlisteners();
    this.addQualitySelector();
    this.addCustomButtons();
    this.addVideoTitle();
  }

  /**
   * Angular lifecycle hook that disposes of the Video.js player instance when the component is destroyed.
   */
  ngOnDestroy() {
    if (this.player) {
      this.player.dispose();
    }
  }

  /**
   * Sets up user activity event listeners.
   */
  setUpActivityEventlisteners() {
    this.player.on('useractive', () => {
      this.userActivityChange.emit(true); // Aktiv
    });
    this.player.on('userinactive', () => {
      this.userActivityChange.emit(false); // Inaktiv
    });
  }

  /**
   * Adds custom forward and rewind buttons to the Video.js control bar.
   */
  addCustomButtons() {
    this.addRewindButton();
    this.addForwardButton();
  }

  /**
   * Adds a custom rewind button that rewinds the video by 10 seconds when clicked.
   */
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

  /**
   * Adds a custom forward button that advances the video by 10 seconds when clicked.
   */
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

  /**
   * Adds a video title display element to the control bar with the video's title.
   */
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


  /**
   * Adds a custom quality selector to the control bar.
   */
  addQualitySelector() {
    const MenuButton = videojs.getComponent('MenuButton');
    const Menu = videojs.getComponent('Menu');
    const MenuItem: any = videojs.getComponent('MenuItem');

    class QualitySelectorButton extends MenuButton {
      qualityLevels: any;
      menu: any;
      currentLabel: string = 'auto';

      constructor(player: PlayerWithQualityLevels, options?: any) {
        super(player, options);
        this.addClass('vjs-quality-selector');
        this.qualityLevels = player.qualityLevels?.();
        if (this.qualityLevels) this.createQualityMenu();
        this.updateButtonText();
      }

      createQualityMenu() {
        this.menu = new Menu(this.player());
        this.qualityLevels.on('addqualitylevel', () => this.updateQualityMenu());
        this.updateQualityMenu();
        this.addChild(this.menu);
      }

      updateQualityMenu() {
        // remove all menu items
        while (this.menu.children().length > 0) this.menu.removeChild(this.menu.children()[0]);
        
        // add auto
        const autoMenuItem = this.createMenuItem('Auto', true, () => {
          this.disableAllLevels();
          this.setCurrentLabel('auto');
          autoMenuItem.selected(true);
        });
        this.menu.addChild(autoMenuItem);

        // add quality levels
        this.qualityLevels.levels_.forEach((level: any, i: number) => {
          const menuItem = this.createMenuItem(`${level.height}p`, false, () => {
            this.disableAllLevels();
            this.qualityLevels.levels_[i].enabled = true;
            this.setCurrentLabel(`${level.height}p`);
            menuItem.selected(true);
          });
          this.menu.addChild(menuItem);
        });
      
      }

      createMenuItem(label: string, selected: boolean, onClick: () => void) {
        const menuItem = new MenuItem(this.player(), { label, selectable: true, selected });
        menuItem.on('click', (event: Event) => {
          event.stopPropagation();
          onClick();
        });
        menuItem.on('touchstart', (e: Event) => {
          e.stopPropagation();
          e.preventDefault();
          onClick(); 
        });
        return menuItem;
      }

      disableAllLevels() {
        this.qualityLevels.levels_.forEach((level: any) => (level.enabled = false));
        this.menu.children().forEach((child: any) => child.selected(false));
      }

      setCurrentLabel(label: string) {
        this.currentLabel = label;
        this.updateButtonText();
      }

      updateButtonText() {
        if (this.el_) {
          const span = this.el_.querySelector('.vjs-icon-placeholder');
          if (span) span.textContent = this.currentLabel;
        }
      }
    }

    videojs.registerComponent('QualitySelectorButton', QualitySelectorButton);

    this.player.ready(() => {
      this.player
        .getChild('controlBar')!
        .addChild('QualitySelectorButton', {}, 7);
    });
  }
}
