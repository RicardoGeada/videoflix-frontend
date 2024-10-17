import { Component, ElementRef, HostListener, ViewChild } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { VjsPlayerComponent } from './vjs-player/vjs-player.component';

@Component({
  selector: 'app-videoplayer-page',
  standalone: true,
  imports: [FormsModule, VjsPlayerComponent],
  templateUrl: './videoplayer-page.component.html',
  styleUrl: './videoplayer-page.component.scss'
})
export class VideoplayerPageComponent {

  // @ViewChild('video') video! : ElementRef<HTMLVideoElement>;
  // @ViewChild('progressbar') progressbar! : ElementRef<HTMLDivElement>;

  // duration: number = 0;
  // currentTime : number = 0;
  // volume: number = 1;

  // bufferedPercent: number = 0;
  // playedPercent: number = 0;

  // isDragging : boolean = false;

  // ngAfterViewInit() {
  //   const video = this.video.nativeElement;
  //   video.volume = this.volume;
  //   video.addEventListener('loadedmetadata', () => {
  //     this.duration = video.duration;
  //   })
  // }

  // setTime(event : any) {
  //   const video = this.video.nativeElement;
  //   video.currentTime = this.currentTime;
  // }

  // getTimeRemaining() { 
  //   const time = this.duration - this.currentTime;
  //   const hours : number = Math.floor(time / 3600);
  //   const minutes : number = Math.floor((time % 3600) / 60);
  //   const seconds : number = Math.floor(time % 60);
  //   return `${this.pad(hours)}:${this.pad(minutes)}:${this.pad(seconds)}`
    
  // }

  // pad(time: number) : string {
  //   return time < 10 ? `0${time}` : `${time}`;
  // }


  // // Progress Bar - Drag & Drop

  // onMouseDownThumb(event : MouseEvent) : void {
  //   event.preventDefault();
  //   this.isDragging = true;
  //   document.addEventListener('mousemove', this.onMouseMove);
  //   document.addEventListener('mouseup', this.onMouseUp);
  //   this.thumbDragged(event.clientX);
  // }

  // @HostListener('document:mousemove', ['$event'])
  // onMouseMove = (event: MouseEvent) => {
  //   if (this.isDragging) {
  //     this.thumbDragged(event.clientX);
  //   }
  // }

  // @HostListener('document:mouseup', ['$event'])
  // onMouseUp = (event: MouseEvent) => {
  //   if (this.isDragging) {
  //     this.isDragging = false;
  //     this.thumbDragged(event.clientX);
  //   }
  // }

  // thumbDragged(clientX: number): void {
  //   const progressbar = this.progressbar.nativeElement;
  //   const rect = progressbar.getBoundingClientRect();
  //   let x = clientX - rect.left;
  //   x = Math.max(0, Math.min(x, rect.width)); // Begrenzung von 0 bis zur Breite des Containers
  //   const percent = x / rect.width;
  //   this.playedPercent = percent * 100;
  //   const video: HTMLVideoElement = this.video.nativeElement;
  //   this.currentTime = percent * this.duration;

  // }


}
