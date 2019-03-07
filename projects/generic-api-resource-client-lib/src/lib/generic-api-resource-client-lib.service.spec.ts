import { TestBed } from '@angular/core/testing';

import { GenericApiResourceClientLibService } from './generic-api-resource-client-lib.service';

describe('GenericApiResourceClientLibService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: GenericApiResourceClientLibService = TestBed.get(GenericApiResourceClientLibService);
    expect(service).toBeTruthy();
  });
});
