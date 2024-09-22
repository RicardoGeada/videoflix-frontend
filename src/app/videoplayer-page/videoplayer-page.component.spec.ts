import { ComponentFixture, TestBed } from '@angular/core/testing';

import { VideoplayerPageComponent } from './videoplayer-page.component';

describe('VideoplayerPageComponent', () => {
  let component: VideoplayerPageComponent;
  let fixture: ComponentFixture<VideoplayerPageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [VideoplayerPageComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(VideoplayerPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
