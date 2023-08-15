import { TestBed } from '@angular/core/testing';

import { QueriesServiceService } from './queries-service.service';

describe('QueriesServiceService', () => {
  let service: QueriesServiceService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(QueriesServiceService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
