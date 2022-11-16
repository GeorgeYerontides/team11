import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PatientObserveScreenComponent } from './patient-observe-screen.component';

describe('PatientObserveScreenComponent', () => {
  let component: PatientObserveScreenComponent;
  let fixture: ComponentFixture<PatientObserveScreenComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PatientObserveScreenComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PatientObserveScreenComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
