import { TestBed } from '@angular/core/testing';

import { PoliceHUBService } from './police-hub.service';

describe('PoliceHUBService', () => {
  let service: PoliceHUBService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(PoliceHUBService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
