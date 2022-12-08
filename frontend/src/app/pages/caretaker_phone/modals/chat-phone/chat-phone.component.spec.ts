import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ChatPhoneComponent } from './chat-phone.component';

describe('ChatPhoneComponent', () => {
  let component: ChatPhoneComponent;
  let fixture: ComponentFixture<ChatPhoneComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ChatPhoneComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ChatPhoneComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
