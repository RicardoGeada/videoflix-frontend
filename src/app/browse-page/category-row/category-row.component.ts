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

  private scrollTimeOut : boolean = false;


  /**
   * @constructor
   * @param {ChangeDetectorRef} cdr - Service for manually triggering change detection.
   */
  constructor(private cdr: ChangeDetectorRef) {}


  /**
   * Lifecycle hook called after the view has been initialized.
   * Performs initializations such as updating items per row and calculating total pages.
   */
  ngAfterViewInit() {
    this.updateItemsInRow();
    this.calculateTotalPages();
    this.cdr.detectChanges();
  }


  /**
   * HostListener for the window resize event.
   * Updates the number of items per row, total pages, and adjusts the slider index accordingly.
   * 
   * @param {Event} event - The resize event.
   */
  @HostListener('window:resize', ['$event'])
  onResize(event: Event) {
    this.updateItemsInRow();
    this.calculateTotalPages();
    this.updateSliderIndex();
  }


  /**
   * Updates the CSS property value of the CSS variable '--itemsInRow'
   */
  updateItemsInRow() {
    const sliderElement = this.slider.nativeElement;
    const computedStyle = getComputedStyle(sliderElement);
    const itemsInRowValue = computedStyle.getPropertyValue('--itemsInRow');
    this.itemsInRow = parseInt(itemsInRowValue.trim(), 10) || 1;
  }


  /**
   * Updates the slider index after resizing.
   */
  updateSliderIndex() {
    this.sliderIndex = Math.ceil(this.firstItemInRow / this.totalPages);
    if (this.sliderIndex > this.totalPages - 1) this.sliderIndex = this.totalPages - 1;
  }


  /**
   * Calculates the total number of pages based on the number of videos and items per row.
   */
  calculateTotalPages() {
    this.totalPages = Math.ceil(this.videos.length / this.itemsInRow);
  }


  /**
   * Initiates the animation to slide the content to the left.
   * Updates the slider index and the first visible item index after the animation.
   */
  slideLeft() {
    if (this.totalPages > 1  && this.slided) {
      this.animateSlide('left');
      setTimeout(()=> {
        this.removeSlideAnimationClass();
        this.setFirstItemInRowAfterSlide('left');
        this.slided = true;
        this.sliderIndex == 0 ? this.sliderIndex = this.totalPages - 1 : this.sliderIndex--;
        setTimeout(() => this.slider.nativeElement.classList.remove('no-transition'), 50);
      }, 1000);
    }
  }

  
   /**
   * Initiates the animation to slide the content to the right.
   * Updates the slider index and the first visible item index after the animation.
   */
   slideRight() { 
    if (this.totalPages > 1) {
      this.animateSlide('right');
      setTimeout(()=> {
        this.removeSlideAnimationClass();
        this.setFirstItemInRowAfterSlide('right');
        this.slided = true;
        this.sliderIndex == this.totalPages - 1 ? this.sliderIndex = 0 : this.sliderIndex++;
        setTimeout(() => this.slider.nativeElement.classList.remove('no-transition'), 50);
      }, 1000);
    }  
  }


  /**
   * Animates the slider in the specified direction.
   * 
   * @param {'left' | 'right'} direction - The direction of the animation.
   */
  animateSlide(direction : 'left' | 'right') {
    let stepsToSlide = direction == 'left' ? this.stepsToSlideToLeft() : this.stepsToSlideToRight();
    this.translateXValue = this.slided 
      ? -((100 + (1/ this.itemsInRow) * 100) + (100 * stepsToSlide / this.itemsInRow)) 
      : -(100 * stepsToSlide / this.itemsInRow);
    this.slider.nativeElement.classList.add('animate-slide');
  }


  /**
   * Calculates the necessary steps to slide to the left.
   * 
   * @returns {number} The number of steps to slide left.
   */
  stepsToSlideToLeft(): number {
    let stepsToSlide = -this.itemsInRow; 
    let nextFirstPos = this.firstItemInRow - this.itemsInRow; 
    if (nextFirstPos < 0 && (this.sliderIndex > 0)) { 
      for (let i = 0; nextFirstPos + i < 0; i++) { -1
        stepsToSlide++; 
      }
    }
    return stepsToSlide;
  }


  /**
   * Calculates the necessary steps to slide to the right.
   * 
   * @returns {number} The number of steps to slide right.
   */
  stepsToSlideToRight(): number {
    let stepsToSlide = this.itemsInRow; 
    let nextFirstPos = this.firstItemInRow + this.itemsInRow; 
    let nextEndPos = nextFirstPos + this.itemsInRow - 1;

    if (nextEndPos >= this.videos.length && !(this.sliderIndex == this.totalPages - 1)) { 
      for (let i = 0; nextEndPos - i >= this.videos.length; i++) {
        stepsToSlide--; 
      }
    }

    if (nextFirstPos >= this.videos.length && this.sliderIndex == this.totalPages - 1) {
      for (let i = 0; nextFirstPos - i > this.videos.length; i++) {
        stepsToSlide--; 
      }
    }

    return stepsToSlide; 
  }


  /**
   * Removes the slide animation class and adds the 'no-transition' class.
   */
  removeSlideAnimationClass() {
    this.slider.nativeElement.classList.remove('animate-slide');
    this.slider.nativeElement.classList.add('no-transition');  
  }


  /**
   * Sets the new index of the first visible item after a slide animation.
   * 
   * @param {'left' | 'right'} direction - The direction in which the slide occurred.
   */
  setFirstItemInRowAfterSlide(direction : 'left' | 'right') {
    if (direction == 'left') {
      if (this.firstItemInRow - this.itemsInRow < 0 && this.sliderIndex == 0) {
        this.firstItemInRow = this.videos.length - this.itemsInRow;
      } else if (this.firstItemInRow - this.itemsInRow < 0 && this.sliderIndex > 0) {
        this.firstItemInRow = 0;
      } else {
        this.firstItemInRow -= this.itemsInRow;
      }
    }
    
    if (direction == 'right') {
      if (this.sliderIndex == this.totalPages - 2) {
        this.firstItemInRow = this.videos.length - this.itemsInRow;
      } else if (this.sliderIndex == this.totalPages - 1) {
        this.firstItemInRow = 0;
      } else {
        this.firstItemInRow += this.itemsInRow;
      }
    }
  }


  /**
   * Creates an array with the indices of items that appear before the current row.
   * 
   * @returns {number[]} An array of previous item indices.
   */
  itemsBefore(): number[] { 
    let itemsbefore = [];
    for (let i = -(this.itemsInRow + 1); i < 0; i++) { 
      let item;
      if (i + this.firstItemInRow < 0) item = this.videos.length + (i + this.firstItemInRow); 
      else item = this.firstItemInRow + i;
      itemsbefore.push(item); 
    }
    return itemsbefore;
  } 


  /**
   * Creates an array with the indices of items currently displayed in the row.
   * 
   * @returns {number[]} An array of displayed item indices.
   */
  itemsShown(): number[] {
    const items : number[] = [];
    const maxItems = Math.min(this.itemsInRow, this.videos.length);

    for (let i = 0; i < maxItems; i++) {
      const itemIndex = (this.firstItemInRow + i) % this.videos.length;
      if (!items.includes(itemIndex)) {
        items.push(itemIndex);
      }
    }
    return items;
  }
  

  /**
   * Creates an array with the indices of items that appear after the current row.
   * 
   * @returns {number[]} An array of subsequent item indices.
   */
  itemsAfter(): number[] {
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


   /**
   * HostListener for the wheel event to trigger horizontal sliding.
   * Slides left or right depending on the horizontal scroll direction.
   * 
   * @param {WheelEvent} event - The wheel event.
   */
  @HostListener('wheel', ['$event'])
  onWheelEvent(event: WheelEvent) {

    if (this.scrollTimeOut) {
      return;  // Prevent further actions if debouncing is active
    } else {

      // Block left scrolling unless a previous slide has been done
      if (event.deltaX < 0 && !this.slided) {
        return;
      } else { 
        this.scrollTimeOut = true;
      }

      // Trigger appropriate slideing based on scroll direction.
      if (event.deltaX > 0) {
        this.slideRight();
      } else if (event.deltaX < 0) {
        this.slideLeft();
      }
  
      // Reset debounce lock
      setTimeout(() => {
        this.scrollTimeOut = false;
      }, 1500);
    }

  }

}
