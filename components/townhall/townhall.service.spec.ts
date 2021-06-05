import { TestBed } from '@angular/core/testing';

import { TownhallService } from './townhall.service';

describe('TownhallService', () => {
  let service: TownhallService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(TownhallService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
