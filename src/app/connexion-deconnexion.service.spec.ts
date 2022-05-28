import { TestBed } from '@angular/core/testing';

import { ConnexionDeconnexionService } from './connexion-deconnexion.service';

describe('ConnexionDeconnexionService', () => {
  let service: ConnexionDeconnexionService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ConnexionDeconnexionService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
