import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MedicalEventBoxComponent } from './medical-event-box.component';

describe('MedicalEventBoxComponent', () => {
  let component: MedicalEventBoxComponent;
  let fixture: ComponentFixture<MedicalEventBoxComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MedicalEventBoxComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MedicalEventBoxComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
