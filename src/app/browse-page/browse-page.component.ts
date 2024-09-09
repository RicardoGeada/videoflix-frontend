import { Component } from '@angular/core';
import { HeaderComponent } from '../shared/components/header/header.component';
import { FooterComponent } from '../shared/components/footer/footer.component';
import { BillboardComponent } from './billboard/billboard.component';

@Component({
  selector: 'app-browse-page',
  standalone: true,
  imports: [HeaderComponent, FooterComponent, BillboardComponent],
  templateUrl: './browse-page.component.html',
  styleUrl: './browse-page.component.scss'
})
export class BrowsePageComponent {

}
