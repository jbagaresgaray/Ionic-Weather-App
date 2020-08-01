import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { WeatherCardItemComponent } from './weather-card-item.component';

describe('WeatherCardItemComponent', () => {
  let component: WeatherCardItemComponent;
  let fixture: ComponentFixture<WeatherCardItemComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ WeatherCardItemComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(WeatherCardItemComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
