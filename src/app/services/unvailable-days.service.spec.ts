import { TestBed } from '@angular/core/testing';

import { UnvailableDaysService } from './unvailable-days.service';

describe('UnvailableDaysService', () => {
  let service: UnvailableDaysService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(UnvailableDaysService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
