import { Component, Input } from '@angular/core';
import { Router } from '@angular/router';


@Component({
  selector: 'app-video-slider-item',
  standalone: true,
  imports: [],
  templateUrl: './video-slider-item.component.html',
  styleUrl: './video-slider-item.component.scss'
})
export class VideoSliderItemComponent {

  @Input() video : any;

  constructor(private router: Router) {}

  openDetailView(id: number) {
    this.router.navigate(['/browse'], { queryParams: { vid: id } });
  }


}
