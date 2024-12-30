import { TestBed } from '@angular/core/testing';

import { BackendApiService } from './backend-api.service';
import { HttpClientTestingModule } from '@angular/common/http/testing';

describe('BackendApiService', () => {
  let service: BackendApiService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule]
    });
    service = TestBed.inject(BackendApiService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
