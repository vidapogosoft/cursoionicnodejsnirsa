import { TestBed } from '@angular/core/testing';

import { IndexedsvcService } from './indexedsvc.service';

describe('IndexedsvcService', () => {
  let service: IndexedsvcService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(IndexedsvcService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
