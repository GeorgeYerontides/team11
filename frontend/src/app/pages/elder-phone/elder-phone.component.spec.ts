import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ElderPhoneComponent } from './elder-phone.component';

describe('ElderPhoneComponent', () => {
  let component: ElderPhoneComponent;
  let fixture: ComponentFixture<ElderPhoneComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ElderPhoneComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ElderPhoneComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
