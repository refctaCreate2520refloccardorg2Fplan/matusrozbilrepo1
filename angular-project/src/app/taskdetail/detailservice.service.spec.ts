import { TestBed } from '@angular/core/testing';

import { DetailserviceService } from './detailservice.service';

describe('DetailserviceService', () => {
  let service: DetailserviceService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(DetailserviceService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
