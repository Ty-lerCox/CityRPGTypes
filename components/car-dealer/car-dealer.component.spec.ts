import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CarDealerComponent } from './car-dealer.component';

describe('CarDealerComponent', () => {
  let component: CarDealerComponent;
  let fixture: ComponentFixture<CarDealerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CarDealerComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CarDealerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
