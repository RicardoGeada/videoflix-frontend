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

  translateXValue = 0;

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
    this.updateSliderIndex();
  }

  updateItemsInRow() {
    const sliderElement = this.slider.nativeElement;
    const computedStyle = getComputedStyle(sliderElement);
    const itemsInRowValue = computedStyle.getPropertyValue('--itemsInRow');

    this.itemsInRow = parseInt(itemsInRowValue.trim(), 10) || 1;
  }

  updateSliderIndex() {
    this.sliderIndex = Math.ceil(this.firstItemInRow / this.totalPages);
    if (this.sliderIndex > this.totalPages - 1) this.sliderIndex = this.totalPages - 1;
  }

  calculateTotalPages() {
    this.totalPages = Math.ceil(this.videos.length / this.itemsInRow);
  }


  slideLeft() {

    let stepsToSlide = -this.itemsInRow; // 0 3 6 7 -> -3 3 1
    let nextFirstPos = this.firstItemInRow - this.itemsInRow; // -2
    if (nextFirstPos < 0 && (this.sliderIndex > 0)) { // -2 -1 0
      for (let i = 0; nextFirstPos + i < 0; i++) { -1
        stepsToSlide++; // 2 // 1
      }
    }

    this.translateXValue = -((100 + (1/ this.itemsInRow) * 100) + (100 * stepsToSlide / this.itemsInRow));
    this.slider.nativeElement.classList.add('animate-slide');

    setTimeout(()=> {
      this.slider.nativeElement.classList.remove('animate-slide');
      this.slider.nativeElement.classList.add('no-transition');

      if (this.firstItemInRow - this.itemsInRow < 0 && this.sliderIndex == 0) {
        this.firstItemInRow = this.videos.length - this.itemsInRow;
      } else if (this.firstItemInRow - this.itemsInRow < 0 && this.sliderIndex > 0) {
        this.firstItemInRow = 0;
      } else {
        this.firstItemInRow -= this.itemsInRow;
      }
  
      this.slided = true;
      this.sliderIndex == 0 ? this.sliderIndex = this.totalPages - 1 : this.sliderIndex--;

      setTimeout(() => {
        this.slider.nativeElement.classList.remove('no-transition'); 
      }, 50);
    }, 1000)
    

  }

  slideRight() {

    let stepsToSlide = this.itemsInRow; // 0 3 6 7 -> 3 3 1
    let nextFirstPos = this.firstItemInRow + this.itemsInRow; // 9
    let nextEndPos = nextFirstPos + this.itemsInRow - 1; // 11
    if (nextEndPos >= this.videos.length && !(this.sliderIndex == this.totalPages - 1)) { // 9 10 11
      for (let i = 0; nextEndPos - i >= this.videos.length; i++) {
        stepsToSlide--; // 2 // 1
      }
    }

    this.translateXValue = this.slided ? -((100 + (1/ this.itemsInRow) * 100) + (100 * stepsToSlide / this.itemsInRow)) : -100;
    this.slider.nativeElement.classList.add('animate-slide');
     


    setTimeout(()=> {
      this.slider.nativeElement.classList.remove('animate-slide');
      this.slider.nativeElement.classList.add('no-transition');

      if (this.sliderIndex == this.totalPages - 2) {
        this.firstItemInRow = this.videos.length - this.itemsInRow;
      } else if (this.sliderIndex == this.totalPages - 1) {
        this.firstItemInRow = 0;
      } else {
        this.firstItemInRow += this.itemsInRow;
      }
  
      this.slided = true;
      this.sliderIndex == this.totalPages - 1 ? this.sliderIndex = 0 : this.sliderIndex++;
      setTimeout(() => {
        this.slider.nativeElement.classList.remove('no-transition'); 
      }, 50);
    }, 1000)

    


  }


  itemsbefore() { 
    let itemsbefore = [];
    for (let i = -(this.itemsInRow + 1); i < 0; i++) { 
      let item;
      if (i + this.firstItemInRow < 0) item = this.videos.length + (i + this.firstItemInRow); 
      else item = this.firstItemInRow + i;
      itemsbefore.push(item); 
    }
    return itemsbefore;
  } 


  itemsShown() {
    let items = [];
    for (let i = this.firstItemInRow; i < this.firstItemInRow + this.itemsInRow; i++) {
      let item;
      // if (i >= this.videos.length) item = i % this.videos.length;
      // else item = i;
      item = i % this.videos.length;
      items.push(item);
    }
    return items;
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
