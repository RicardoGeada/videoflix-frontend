import { Component } from '@angular/core';
import { HeaderComponent } from '../shared/components/header/header.component';
import { FooterComponent } from '../shared/components/footer/footer.component';
import { BillboardComponent } from './billboard/billboard.component';
import { CategoryRowComponent } from './category-row/category-row.component';
import { ContentService } from '../services/content/content.service';
import { VideoDetailComponent } from './video-detail/video-detail.component';


@Component({
  selector: 'app-browse-page',
  standalone: true,
  imports: [HeaderComponent, FooterComponent, BillboardComponent, CategoryRowComponent, VideoDetailComponent],
  templateUrl: './browse-page.component.html',
  styleUrl: './browse-page.component.scss'
})
export class BrowsePageComponent {
  
  genres: {id: number, name: string}[] = [];

  constructor(private contentService: ContentService) {}

  ngOnInit() {
    this.loadGenres();
  }

  async loadGenres() {
    const response : any = await this.contentService.getGenres();
    this.genres = response;
    console.log(response);
  }

}
