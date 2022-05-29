import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProlongationComponent } from './prolongation.component';

describe('ProlongationComponent', () => {
  let component: ProlongationComponent;
  let fixture: ComponentFixture<ProlongationComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ProlongationComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ProlongationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
