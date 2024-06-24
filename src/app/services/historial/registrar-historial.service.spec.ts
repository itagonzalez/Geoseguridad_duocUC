import { TestBed } from '@angular/core/testing';

import { RegistrarHistorialService } from './registrar-historial.service';

describe('RegistrarHistorialService', () => {
  let service: RegistrarHistorialService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(RegistrarHistorialService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
