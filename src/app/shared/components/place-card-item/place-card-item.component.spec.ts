import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PlaceCardItemComponent } from './place-card-item.component';

describe('PlaceCardItemComponent', () => {
  let component: PlaceCardItemComponent;
  let fixture: ComponentFixture<PlaceCardItemComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PlaceCardItemComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PlaceCardItemComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
