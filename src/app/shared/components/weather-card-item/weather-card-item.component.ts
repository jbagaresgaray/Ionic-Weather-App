import {
  Component,
  OnInit,
  ViewEncapsulation,
  Output,
  EventEmitter,
  Input,
} from '@angular/core';
import toLower from 'lodash-es/toLower';

import { WeatherService } from '../../services/weather.service';

@Component({
  selector: 'app-weather-card-item',
  encapsulation: ViewEncapsulation.None,
  templateUrl: './weather-card-item.component.html',
  styleUrls: ['./weather-card-item.component.scss'],
})
export class WeatherCardItemComponent implements OnInit {
  // tslint:disable-next-line:no-output-on-prefix
  @Output() onCardClick = new EventEmitter();
  @Input() city: string;
  @Input() cardImage: any = {};

  weatherInfo: any = {};
  locationInfo: any = {};

  weatherDescription: string;

  constructor(private weatherService: WeatherService) {}

  ngOnInit(): void {
    // this.weatherService.getOpenWeatherByCity(this.city).subscribe(
    //   (response) => {
    //     console.log('getOpenWeatherByCity response: ', response);
    //   },
    //   (error) => {
    //     console.log('getOpenWeatherByCity error: ', error);
    //   }
    // );
    // this.getWeatherInfo();
  }

  cardClick(event: any) {
    this.onCardClick.emit(event);
  }

  private getWeatherInfo() {
    this.weatherService.getWeatherStackByCity(this.city).subscribe(
      (response: any) => {
        if (response) {
          this.weatherInfo = response.current;
          this.locationInfo = response.location;

          if (response.current) {
            if (response.current.weather_descriptions) {
              this.weatherDescription =
                response.current.weather_descriptions[0];
            }
          }
        }
      },
      (error) => {
        console.log('getWeatherStackByCity error: ', error);
      }
    );
  }

  generateWeatherIcon(weatherDescription) {
    if (weatherDescription) {
      if (toLower(weatherDescription).indexOf('sunny') !== -1) {
        return './assets/Icon-Sun.svg';
      } else if (toLower(weatherDescription).indexOf('rain') !== -1) {
        return './assets/Icon-Rain.svg';
      } else if (toLower(weatherDescription).indexOf('cloud') !== -1) {
        return './assets/Icon-Cloud.svg';
      } else if (toLower(weatherDescription).indexOf('fog') !== -1) {
        return './assets/Icon-Fog.svg';
      } else if (toLower(weatherDescription).indexOf('night') !== -1) {
        return './assets/Icon-Night.svg';
      } else if (toLower(weatherDescription).indexOf('sunrise') !== -1) {
        return './assets/Icon-Sunrise.svg';
      } else if (toLower(weatherDescription).indexOf('sunset') !== -1) {
        return './assets/Icon-Sunset.svg';
      } else if (toLower(weatherDescription).indexOf('overcast') !== -1) {
        return './assets/Icon-Overcast2.svg';
      } else if (toLower(weatherDescription).indexOf('clear') !== -1) {
        return './assets/Icon-Sun.svg';
      }
    }
  }
}
