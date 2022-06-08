import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DysfonctionnementsComponent } from './dysfonctionnements.component';

describe('DysfonctionnementsComponent', () => {
  let component: DysfonctionnementsComponent;
  let fixture: ComponentFixture<DysfonctionnementsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DysfonctionnementsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DysfonctionnementsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
