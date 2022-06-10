import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HttpClientModule } from '@angular/common/http';
import { PageGestionnaireComponent } from './page-gestionnaire.component';
import { RouterTestingModule } from '@angular/router/testing';
import { FormBuilder } from '@angular/forms';

describe('PageGestionnaireComponent', () => {
  let component: PageGestionnaireComponent;
  let fixture: ComponentFixture<PageGestionnaireComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PageGestionnaireComponent ],
      imports: [HttpClientModule, RouterTestingModule ], 
      providers: [FormBuilder]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PageGestionnaireComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
