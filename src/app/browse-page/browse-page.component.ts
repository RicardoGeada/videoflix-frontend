import { ChangeDetectorRef, Component, ElementRef, HostListener, ViewChild } from '@angular/core';
import { HeaderComponent } from '../shared/components/header/header.component';
import { FooterComponent } from '../shared/components/footer/footer.component';
import { BillboardComponent } from './billboard/billboard.component';
import { CategoryRowComponent } from './category-row/category-row.component';

@Component({
  selector: 'app-browse-page',
  standalone: true,
  imports: [HeaderComponent, FooterComponent, BillboardComponent, CategoryRowComponent],
  templateUrl: './browse-page.component.html',
  styleUrl: './browse-page.component.scss'
})
export class BrowsePageComponent {

  @ViewChild('billboardRow') billboardRow!: CategoryRowComponent;
  
  billboardRowHeight: number = 0;

  constructor(private cdr: ChangeDetectorRef) {}

  ngAfterViewInit () {
    this.billboardRowHeight = this.billboardRow.getHeight();
    this.cdr.detectChanges();
  }

  @HostListener('window:resize', ['$event'])
  onResize(event: Event) {
    this.billboardRowHeight = this.billboardRow.getHeight();
  }

}
