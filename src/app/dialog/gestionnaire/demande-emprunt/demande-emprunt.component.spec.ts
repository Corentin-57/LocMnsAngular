import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DemandeEmpruntComponent } from './demande-emprunt.component';

describe('DemandeEmpruntComponent', () => {
  let component: DemandeEmpruntComponent;
  let fixture: ComponentFixture<DemandeEmpruntComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DemandeEmpruntComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DemandeEmpruntComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
