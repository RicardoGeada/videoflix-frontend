import { Component, Input } from '@angular/core';


@Component({
  selector: 'app-video-slider-item',
  standalone: true,
  imports: [],
  templateUrl: './video-slider-item.component.html',
  styleUrl: './video-slider-item.component.scss'
})
export class VideoSliderItemComponent {

  @Input() video : any;

  constructor() {}



}
