import { TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { EtudiantGuard } from './etudiant.guard';
describe('EtudiantGuard', () => {
  let guard: EtudiantGuard;
  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [RouterTestingModule]
    });
    guard = TestBed.inject(EtudiantGuard);
  });
  it('should be created', () => {
    expect(guard).toBeTruthy();
  });
});