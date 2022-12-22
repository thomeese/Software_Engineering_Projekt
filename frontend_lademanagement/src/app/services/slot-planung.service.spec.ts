import { TestBed } from '@angular/core/testing';

import { SlotPlanungService } from './slot-planung.service';

describe('SlotPlanungServiceService', () => {
  let service: SlotPlanungService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(SlotPlanungService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
