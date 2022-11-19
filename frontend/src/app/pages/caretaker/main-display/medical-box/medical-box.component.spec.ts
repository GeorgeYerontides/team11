import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MedicalBoxComponent } from './medical-box.component';

describe('MedicalBoxComponent', () => {
  let component: MedicalBoxComponent;
  let fixture: ComponentFixture<MedicalBoxComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MedicalBoxComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MedicalBoxComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
