import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RoutinePhonectAddComponent } from './routine-phonect-add.component';

describe('RoutinePhonectAddComponent', () => {
  let component: RoutinePhonectAddComponent;
  let fixture: ComponentFixture<RoutinePhonectAddComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RoutinePhonectAddComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(RoutinePhonectAddComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
