import { Injectable, NgZone } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { environment } from './../../../environments/environment';

@Injectable({
  providedIn: 'root',
})
export class UnsplashService {
  constructor(private zone: NgZone, private http: HttpClient) {}

  getPhotoByCityName(cityName, orientation) {
    return this.http.get(
      environment.unsplashURL +
        'search/photos?query=' +
        cityName +
        '&page1=' +
        environment.openWeatherAPI +
        '&orientation=' +
        orientation +
        '&client_id=' +
        environment.UnSplashKey
    );
  }
}
