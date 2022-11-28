import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PatientObservePhoneComponent } from './patient-observe-phone.component';

describe('PatientObservePhoneComponent', () => {
  let component: PatientObservePhoneComponent;
  let fixture: ComponentFixture<PatientObservePhoneComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PatientObservePhoneComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PatientObservePhoneComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
