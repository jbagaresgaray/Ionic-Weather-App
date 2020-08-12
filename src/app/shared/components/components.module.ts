import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonicModule } from '@ionic/angular';

import { WeatherCardItemComponent } from './weather-card-item/weather-card-item.component';
import { PlaceCardItemComponent } from './place-card-item/place-card-item.component';

@NgModule({
  declarations: [WeatherCardItemComponent, PlaceCardItemComponent],
  imports: [CommonModule, IonicModule],
  exports: [WeatherCardItemComponent, PlaceCardItemComponent],
})
export class ComponentsModule {}
