import { TestBed } from '@angular/core/testing';

import { TokenIdenticationService } from './token-identication.service';

describe('TokenIdenticationService', () => {
  let service: TokenIdenticationService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(TokenIdenticationService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
