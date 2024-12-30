import { ComponentFixture, TestBed } from '@angular/core/testing';

import { VideoplayerPageComponent } from './videoplayer-page.component';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { ActivatedRoute } from '@angular/router';

describe('VideoplayerPageComponent', () => {
  let component: VideoplayerPageComponent;
  let fixture: ComponentFixture<VideoplayerPageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [VideoplayerPageComponent, HttpClientTestingModule],
      providers: [
              {
                provide: ActivatedRoute,
                useValue: {
                  snapshot: {
                    paramMap: {
                      get: (key: string) => {
                        if (key === 'id') return 'mock-id';
                        return null;
                      },
                    },
                  },
                },
              },
            ],
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
