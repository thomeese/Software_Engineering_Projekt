import { TestBed } from '@angular/core/testing';

import { SlotplanungServiceService } from './slotplanung-service.service';

describe('SlotplanungServiceService', () => {
  let service: SlotplanungServiceService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(SlotplanungServiceService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
