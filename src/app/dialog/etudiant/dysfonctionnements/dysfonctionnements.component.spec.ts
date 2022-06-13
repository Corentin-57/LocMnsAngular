import { HttpClientTestingModule } from '@angular/common/http/testing';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FormBuilder } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

import { DysfonctionnementsComponent } from './dysfonctionnements.component';

describe('DysfonctionnementsComponent', () => {
  let component: DysfonctionnementsComponent;
  let fixture: ComponentFixture<DysfonctionnementsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DysfonctionnementsComponent ],
      providers: [ FormBuilder, {provide: MatDialogRef, useValue: {}}, {provide: MAT_DIALOG_DATA, useValue: {}}  ],
      imports: [HttpClientTestingModule]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DysfonctionnementsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  xit('should create', () => {
    expect(component).toBeTruthy();
  });
});
