import {
  Component,
  ElementRef,
  Input,
  ViewChild,
  HostListener,
  ChangeDetectorRef
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
  slided = false;
  firstItemInRow = 0;

  constructor(private cdr: ChangeDetectorRef) {}

  ngAfterViewInit() {
    this.updateItemsInRow();
    this.calculateTotalPages();
    this.cdr.detectChanges();
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


  slideLeft() {
    
    if (this.firstItemInRow - this.itemsInRow < 0 && this.sliderIndex == 0) {
      this.firstItemInRow = this.videos.length - this.itemsInRow;
    } else if (this.firstItemInRow - this.itemsInRow < 0 && this.sliderIndex > 0) {
      this.firstItemInRow = 0;
    } else {
      this.firstItemInRow -= this.itemsInRow;
    }

    this.slided = true;
    this.sliderIndex == 0 ? this.sliderIndex = this.totalPages - 1 : this.sliderIndex--;
    
    console.log(this.firstItemInRow);
  }

  slideRight() {

    if (this.sliderIndex == this.totalPages - 2) {
      this.firstItemInRow = this.videos.length - this.itemsInRow;
    } else if (this.sliderIndex == this.totalPages - 1) {
      this.firstItemInRow = 0;
    } else {
      this.firstItemInRow += this.itemsInRow;
    }


    this.slided = true;
    this.sliderIndex == this.totalPages - 1 ? this.sliderIndex = 0 : this.sliderIndex++;
    console.log(this.firstItemInRow);
  }


  itemsbefore() { 
    let itemsbefore = [];
    for (let i = -(this.itemsInRow + 1); i < 0; i++) { 
      let item;
      if (i + this.firstItemInRow < 0) item = this.videos.length + (i + this.firstItemInRow); 
      else item = this.firstItemInRow + i
      itemsbefore.push(item); 
    }
    return itemsbefore;
  } 
  

  itemsafter() {
    const endPos = this.firstItemInRow + (this.itemsInRow - 1) 
    let itemsafter = [];
    for (let i = 1; i <= (this.itemsInRow + 1) ; i++) { 
      let item;
      if (endPos + i >= this.videos.length) item = (endPos + i) % this.videos.length; 
      else item = this.firstItemInRow + this.itemsInRow - 1 + i ;
      itemsafter.push(item);
    }
    return itemsafter;
  } 


}
