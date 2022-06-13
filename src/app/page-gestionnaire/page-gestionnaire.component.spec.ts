import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HttpClientModule } from '@angular/common/http';
import { PageGestionnaireComponent } from './page-gestionnaire.component';
import { RouterTestingModule } from '@angular/router/testing';
import { FormBuilder, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatDialogModule } from '@angular/material/dialog';

describe('PageGestionnaireComponent', () => {
  let component: PageGestionnaireComponent;
  let fixture: ComponentFixture<PageGestionnaireComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PageGestionnaireComponent ],
      imports: [HttpClientModule, RouterTestingModule, MatDialogModule, FormsModule, ReactiveFormsModule ], 
      providers: [FormBuilder]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PageGestionnaireComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  xit('should create', () => {
    expect(component).toBeTruthy();
  });
});
