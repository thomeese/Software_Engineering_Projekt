import { TestBed } from '@angular/core/testing';

import { KonfigurationskonstantenService } from './konfigurationskonstanten.service';

describe('KonfigurationskonstantenService', () => {
  let service: KonfigurationskonstantenService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(KonfigurationskonstantenService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
