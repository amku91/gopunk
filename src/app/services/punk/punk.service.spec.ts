import { TestBed, inject } from '@angular/core/testing';

import { PunkService } from './punk.service';

describe('PunkService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [PunkService]
    });
  });

  it('should be created', inject([PunkService], (service: PunkService) => {
    expect(service).toBeTruthy();
  }));
});
