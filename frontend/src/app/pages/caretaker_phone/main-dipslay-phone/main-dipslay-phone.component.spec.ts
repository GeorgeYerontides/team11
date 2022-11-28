import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MainDipslayPhoneComponent } from './main-dipslay-phone.component';

describe('MainDipslayPhoneComponent', () => {
  let component: MainDipslayPhoneComponent;
  let fixture: ComponentFixture<MainDipslayPhoneComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MainDipslayPhoneComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MainDipslayPhoneComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
