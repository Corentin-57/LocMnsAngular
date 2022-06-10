import { TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';

import { GestionnaireGuard } from './gestionnaire.guard';

describe('GestionnaireGuard', () => {
  let guard: GestionnaireGuard;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [RouterTestingModule]
    });
    guard = TestBed.inject(GestionnaireGuard);
  });

  it('should be created', () => {
    expect(guard).toBeTruthy();
  });
});
