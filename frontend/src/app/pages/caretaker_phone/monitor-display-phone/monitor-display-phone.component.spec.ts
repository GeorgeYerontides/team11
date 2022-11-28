import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MonitorDisplayPhoneComponent } from './monitor-display-phone.component';

describe('MonitorDisplayPhoneComponent', () => {
  let component: MonitorDisplayPhoneComponent;
  let fixture: ComponentFixture<MonitorDisplayPhoneComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MonitorDisplayPhoneComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MonitorDisplayPhoneComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
