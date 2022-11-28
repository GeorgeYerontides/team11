import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HomeDisplayPhoneComponent } from './home-display-phone.component';

describe('HomeDisplayPhoneComponent', () => {
  let component: HomeDisplayPhoneComponent;
  let fixture: ComponentFixture<HomeDisplayPhoneComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ HomeDisplayPhoneComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(HomeDisplayPhoneComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
