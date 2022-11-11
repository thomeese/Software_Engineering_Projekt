import { TestBed } from '@angular/core/testing';

import { SlotPlanungServiceService } from './slot-planung-service.service';

describe('SlotPlanungServiceService', () => {
  let service: SlotPlanungServiceService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(SlotPlanungServiceService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
