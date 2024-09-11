import {
  Component,
  ElementRef,
  Input,
  ViewChild,
  HostListener,
} from '@angular/core';

@Component({
  selector: 'app-category-row',
  standalone: true,
  imports: [],
  templateUrl: './category-row.component.html',
  styleUrl: './category-row.component.scss',
})
export class CategoryRowComponent {
  @Input('categoryVideos') videos: any[] = [];
  @ViewChild('slider') slider!: ElementRef<HTMLDivElement>;

  sliderIndex = 0;
  itemsInRow = 1;
  totalPages = 1;


  ngAfterViewInit() {
    this.updateItemsInRow();
    this.calculateTotalPages();
  }

  @HostListener('window:resize', ['$event'])
  onResize(event: Event) {
    this.updateItemsInRow();
    this.calculateTotalPages();
  }

  updateItemsInRow() {
    const sliderElement = this.slider.nativeElement;
    const computedStyle = getComputedStyle(sliderElement);
    const itemsInRowValue = computedStyle.getPropertyValue('--itemsInRow');

    this.itemsInRow = parseInt(itemsInRowValue.trim(), 10) || 1;
  }

  calculateTotalPages() {
    this.totalPages = Math.ceil(this.videos.length / this.itemsInRow);
  }



  setSliderIndex() {
    const slider = this.slider.nativeElement;
    slider.style.setProperty('--sliderIndex', this.sliderIndex.toString());
  }

  slideLeft() {
    this.sliderIndex == 0 ? this.sliderIndex = this.totalPages - 1 : this.sliderIndex--;
    this.setSliderIndex();
  }

  slideRight() {
    this.sliderIndex == this.totalPages - 1 ? this.sliderIndex = 0 : this.sliderIndex++;
    this.setSliderIndex();
  }
}
