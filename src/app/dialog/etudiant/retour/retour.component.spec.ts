import { HttpClientModule } from '@angular/common/http';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FormBuilder } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

import { RetourComponent } from './retour.component';

describe('RetourComponent', () => {
  let component: RetourComponent;
  let fixture: ComponentFixture<RetourComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RetourComponent ],
      providers: [ 
        {provide: MatDialogRef, useValue: {}},
        {provide: MAT_DIALOG_DATA, useValue: {}},
        FormBuilder
      ],
      imports: [HttpClientModule]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(RetourComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  xit('should create', () => {
    expect(component).toBeTruthy();
  });
});