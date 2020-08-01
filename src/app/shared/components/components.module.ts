import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonicModule } from '@ionic/angular';

import { WeatherCardItemComponent } from './weather-card-item/weather-card-item.component';

@NgModule({
  declarations: [WeatherCardItemComponent],
  imports: [CommonModule, IonicModule],
  exports: [WeatherCardItemComponent],
})
export class ComponentsModule {}
