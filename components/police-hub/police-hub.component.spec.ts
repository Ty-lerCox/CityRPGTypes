import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PoliceHUBComponent } from './police-hub.component';

describe('PoliceHUBComponent', () => {
  let component: PoliceHUBComponent;
  let fixture: ComponentFixture<PoliceHUBComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PoliceHUBComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PoliceHUBComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
