import { HttpClientTestingModule } from '@angular/common/http/testing';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FormBuilder } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { DemandeEmpruntComponent } from './demande-emprunt.component';
describe('DemandeEmpruntComponent', () => {
  let component: DemandeEmpruntComponent;
  let fixture: ComponentFixture<DemandeEmpruntComponent>;
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DemandeEmpruntComponent ],
      providers: [ FormBuilder, {provide: MatDialogRef, useValue: {}}, {provide: MAT_DIALOG_DATA, useValue: {}}  ],
      imports: [HttpClientTestingModule]
    })
    .compileComponents();
  });
  beforeEach(() => {
    fixture = TestBed.createComponent(DemandeEmpruntComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });
  xit('should create', () => {
    expect(component).toBeTruthy();
  });
});