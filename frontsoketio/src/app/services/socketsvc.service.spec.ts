import { TestBed } from '@angular/core/testing';

import { SocketsvcService } from './socketsvc.service';

describe('SocketsvcService', () => {
  let service: SocketsvcService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(SocketsvcService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
