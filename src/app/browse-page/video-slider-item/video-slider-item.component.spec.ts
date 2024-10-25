import { ComponentFixture, TestBed } from '@angular/core/testing';

import { VideoSliderItemComponent } from './video-slider-item.component';

describe('VideoSliderItemComponent', () => {
  let component: VideoSliderItemComponent;
  let fixture: ComponentFixture<VideoSliderItemComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [VideoSliderItemComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(VideoSliderItemComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
