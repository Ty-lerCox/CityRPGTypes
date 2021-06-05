import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HeistComponent } from './heist.component';

describe('HeistComponent', () => {
  let component: HeistComponent;
  let fixture: ComponentFixture<HeistComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ HeistComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(HeistComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
