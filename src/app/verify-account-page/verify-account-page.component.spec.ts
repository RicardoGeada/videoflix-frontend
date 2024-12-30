import { ComponentFixture, TestBed } from '@angular/core/testing';

import { VerifyAccountPageComponent } from './verify-account-page.component';
import { ActivatedRoute } from '@angular/router';
import { HttpClientTestingModule } from '@angular/common/http/testing';

describe('VerifyAccountPageComponent', () => {
  let component: VerifyAccountPageComponent;
  let fixture: ComponentFixture<VerifyAccountPageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [VerifyAccountPageComponent, HttpClientTestingModule],
      providers: [
        {
          provide: ActivatedRoute,
          useValue: {
            snapshot: {
              queryParamMap: {
                get: (key: string) => {
                  if (key === 'uid') return 'mock-uid';
                  if (key === 'token') return 'mock-token';
                  return null;
                },
              },
            },
          },
        },
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(VerifyAccountPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
