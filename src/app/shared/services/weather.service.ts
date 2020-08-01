import { environment } from './../../../environments/environment';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root',
})
export class WeatherService {
  constructor(private http: HttpClient) {}

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
}
