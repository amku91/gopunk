import { TestBed, inject } from '@angular/core/testing';

import { ContextService } from './context.service';

describe('ContextService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [ContextService]
    });
  });

  it('should be created', inject([ContextService], (service: ContextService) => {
    expect(service).toBeTruthy();
  }));

  it('should be truthy | handle error', inject([ContextService], (service: ContextService) => {
    expect(service.handleError("xyz")).toBeTruthy();
  }));
});
