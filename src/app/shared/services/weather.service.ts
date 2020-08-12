import { environment } from './../../../environments/environment';
import { Injectable, NgZone } from '@angular/core';
import { HttpClient } from '@angular/common/http';

declare const google: any;

@Injectable({
  providedIn: 'root',
})
export class WeatherService {
  private GoogleAutocomplete: any;

  constructor(private zone: NgZone, private http: HttpClient) {
    this.GoogleAutocomplete = new google.maps.places.AutocompleteService();
  }

  getOpenWeatherByCity(cityName) {
    return this.http.get(
      environment.openWeatherURL +
        'weather?q=' +
        cityName +
        '&appid=' +
        environment.openWeatherAPI +
        '&units=metric'
    );
  }

  getWeatherStackByCity(cityName) {
    return this.http.get(
      environment.weatherStackURL +
        'current?query=' +
        cityName +
        '&access_key=' +
        environment.weatherStackAPI +
        '&units=m'
    );
  }

  getWeatherStackForecastByCity(cityName) {
    return this.http.get(
      environment.weatherStackURL +
        'forecast?query=' +
        cityName +
        '&access_key=' +
        environment.weatherStackAPI +
        '&forecast_days=7&units=m'
    );
  }

  async searchGooglePlaces(searchText: any, origin: any) {
    return new Promise((resolve, reject) => {
      this.GoogleAutocomplete.getPlacePredictions(
        { input: searchText, origin, types: ['(cities)'] },
        (predictions, status) => {
          this.zone.run(() => {
            resolve(predictions);
          });
        }
      );
    });
  }
}
