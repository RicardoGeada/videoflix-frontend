import { Component, ElementRef, ViewChild } from '@angular/core';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-videoplayer-page',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './videoplayer-page.component.html',
  styleUrl: './videoplayer-page.component.scss'
})
export class VideoplayerPageComponent {

  @ViewChild('video') video! : ElementRef<HTMLVideoElement>;

  duration: number = 0;
  currentTime : number = 0;
  volume: number = 1;

  ngAfterViewInit() {
    const video = this.video.nativeElement;
    video.volume = this.volume;
    video.addEventListener('loadedmetadata', () => {
      this.duration = video.duration;
    })
  }


  setTime(event : any) {
    const video = this.video.nativeElement;
    video.currentTime = this.currentTime;
  }

  getTimeRemaining() { 
    const time = this.duration - this.currentTime;
    const hours : number = Math.floor(time / 3600);
    const minutes : number = Math.floor((time % 3600) / 60);
    const seconds : number = Math.floor(time % 60);
    return `${this.pad(hours)}:${this.pad(minutes)}:${this.pad(seconds)}`
    
  }

  pad(time: number) : string {
    return time < 10 ? `0${time}` : `${time}`;
  }

}
