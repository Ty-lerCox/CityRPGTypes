import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TownhallComponent } from './townhall.component';

describe('TownhallComponent', () => {
  let component: TownhallComponent;
  let fixture: ComponentFixture<TownhallComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TownhallComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TownhallComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
