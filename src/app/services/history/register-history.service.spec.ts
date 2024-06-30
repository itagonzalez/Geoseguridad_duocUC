import { TestBed } from '@angular/core/testing';

import { RegisterHistoryService } from './register-history.service';

describe('RegisterHistoryService', () => {
  let service: RegisterHistoryService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(RegisterHistoryService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
