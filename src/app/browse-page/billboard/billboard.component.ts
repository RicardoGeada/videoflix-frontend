import { Component, ElementRef, ViewChild } from '@angular/core';

@Component({
  selector: 'app-billboard',
  standalone: true,
  imports: [],
  templateUrl: './billboard.component.html',
  styleUrl: './billboard.component.scss'
})
export class BillboardComponent {
  @ViewChild('billboardVideo') billboardVideo!: ElementRef<HTMLVideoElement>;
  
  playVideo() {
    const video = this.billboardVideo.nativeElement;
    video.play();
  }

  stopVideo() {
    const video = this.billboardVideo.nativeElement;
    video.pause();
    video.currentTime = 0;
  }
}
