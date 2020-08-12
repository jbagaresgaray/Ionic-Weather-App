import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import toLower from 'lodash-es/toLower';
import { ScrollDetail } from '@ionic/core';

import { WeatherService } from './../../shared/services/weather.service';
import { UnsplashService } from './../../shared/services/unsplash.service';

@Component({
  selector: 'app-detail',
  encapsulation: ViewEncapsulation.None,
  templateUrl: './detail.component.html',
  styleUrls: ['./detail.component.scss'],
})
export class DetailComponent implements OnInit {
  paramsObj: any;
  locationObj: any = {};

  weatherInfo: any = {};
  locationInfo: any = {};
  weatherDescription: string;
  cardImage: string;

  showData = false;
  showToolbar = false;

  constructor(
    private route: ActivatedRoute,
    private weatherService: WeatherService,
    private unsplashService: UnsplashService
  ) {
    this.route.queryParamMap.subscribe((params) => {
      this.paramsObj = { ...params.keys, ...params };

      console.log('paramsObj: ', this.paramsObj);
      if (this.paramsObj && this.paramsObj.params) {
        if (this.paramsObj.params && this.paramsObj.params.location) {
          this.locationObj = JSON.parse(this.paramsObj.params.location);
          console.log('locationObj: ', this.locationObj);
          if (this.locationObj) {
            // this.getWeatherInfo(this.locationObj.description);
            // this.getImageInfo(this.locationObj.description);
            // this.getWeatherForecast(this.locationObj.description);
          }
        }
      }
    });
  }

  ngOnInit(): void {}

  ionViewDidEnter() {
    this.showData = true;
  }

  ionViewWillLeave() {
    this.showData = false;
    console.log('ionViewWillLeave: ', this.showData);
  }

  onScroll($event: CustomEvent<ScrollDetail>) {
    if ($event && $event.detail && $event.detail.scrollTop) {
      const scrollTop = $event.detail.scrollTop;
      this.showToolbar = scrollTop >= 225;
    }
  }

  private getWeatherInfo(description) {
    this.weatherService.getWeatherStackByCity(description).subscribe(
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

  private getWeatherForecast(description) {
    this.weatherService
      .getWeatherStackForecastByCity(description)
      .subscribe((response: any) => {
        if (response) {
          console.log('getWeatherStackByCity response: ', response);
        }
      });
  }

  private getImageInfo(description) {
    this.unsplashService.getPhotoByCityName(description, 'portrait').subscribe(
      (response: any) => {
        if (response) {
          const images = response.results;
          if (images) {
            if (images[0]) {
              this.cardImage = images[0].urls.full;
            }
          }
        }
      },
      (error) => {
        console.log('getPhotoByCityName error: ', error);
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
