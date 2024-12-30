import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BrowsePageComponent } from './browse-page.component';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { ActivatedRoute } from '@angular/router';
import { of } from 'rxjs';

describe('BrowsePageComponent', () => {
  let component: BrowsePageComponent;
  let fixture: ComponentFixture<BrowsePageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [BrowsePageComponent, HttpClientTestingModule],
      providers: [
        {
          provide: ActivatedRoute,
          useValue: {
            queryParamMap: of({ get: () => 'mock-vid' }),
          },
        },
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(BrowsePageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
