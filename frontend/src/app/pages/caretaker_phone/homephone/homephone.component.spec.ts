import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HomephoneComponent } from './homephone.component';

describe('HomephoneComponent', () => {
  let component: HomephoneComponent;
  let fixture: ComponentFixture<HomephoneComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ HomephoneComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(HomephoneComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
