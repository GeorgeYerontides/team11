import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MainDisplayPhoneComponent } from './main-display-phone.component';

describe('MainDisplayPhoneComponent', () => {
  let component: MainDisplayPhoneComponent;
  let fixture: ComponentFixture<MainDisplayPhoneComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MainDisplayPhoneComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MainDisplayPhoneComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
