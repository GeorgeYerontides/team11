import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HomeCaretakerComponent } from './home-caretaker.component';

describe('HomeCaretakerComponent', () => {
  let component: HomeCaretakerComponent;
  let fixture: ComponentFixture<HomeCaretakerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ HomeCaretakerComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(HomeCaretakerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
