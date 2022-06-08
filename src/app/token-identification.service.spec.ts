import { TestBed } from '@angular/core/testing';

import { TokenIdentificationService } from './token-identification.service';

describe('TokenIdenticationService', () => {
  let service: TokenIdentificationService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(TokenIdentificationService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
