import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MagicalControllerComponent } from './magical-controller.component';

describe('MagicalControllerComponent', () => {
  let component: MagicalControllerComponent;
  let fixture: ComponentFixture<MagicalControllerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MagicalControllerComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MagicalControllerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
