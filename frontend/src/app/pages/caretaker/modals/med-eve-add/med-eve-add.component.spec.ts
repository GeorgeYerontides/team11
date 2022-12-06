import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MedEveAddComponent } from './med-eve-add.component';

describe('MedEveAddComponent', () => {
  let component: MedEveAddComponent;
  let fixture: ComponentFixture<MedEveAddComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MedEveAddComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MedEveAddComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
