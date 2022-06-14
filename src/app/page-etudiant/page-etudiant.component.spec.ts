import { HttpClient, HttpClientModule } from '@angular/common/http';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { ComponentFixture, inject, TestBed } from '@angular/core/testing';
import { FormBuilder } from '@angular/forms';
import { MatDialogModule } from '@angular/material/dialog';
import { environment } from 'src/environments/environment';

import { PageEtudiantComponent } from './page-etudiant.component';

describe('PageEtudiantComponent', () => {
  let component: PageEtudiantComponent;
  let fixture: ComponentFixture<PageEtudiantComponent>;
  let httpTestCtrl: HttpTestingController;
  let http: HttpClient;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [PageEtudiantComponent],
      imports: [MatDialogModule, HttpClientModule, HttpClientTestingModule],
      providers: [FormBuilder]
    })
      .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PageEtudiantComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
    httpTestCtrl = TestBed.get(HttpTestingController); //Création de l'instance 
    http: HttpClient;
  });

  xit('should create', () => {
    expect(component).toBeTruthy();
  });

});