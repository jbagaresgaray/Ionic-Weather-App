import { Component, OnInit, ViewEncapsulation, NgZone } from '@angular/core';
import { NavController, ModalController } from '@ionic/angular';
import { Plugins } from '@capacitor/core';
import * as async from 'async';
import {
  PLACES,
  LOCATION_LIST,
} from './../../shared/constants/places.constant';
import { SearchModalComponent } from '../search-modal/search-modal.component';

import { StorageService } from './../../shared/services/storage.service';
import { UnsplashService } from './../../shared/services/unsplash.service';

const { Geolocation } = Plugins;

@Component({
  selector: 'app-home',
  encapsulation: ViewEncapsulation.None,
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})
export class HomeComponent implements OnInit {
  cityListArr: any[] = [];
  fakeArr: any[] = [];
  showData = true;
  showSearch = false;

  constructor(
    private zone: NgZone,
    private navCtrl: NavController,
    private modalController: ModalController,
    private storageService: StorageService,
    private unsplashService: UnsplashService
  ) {
    this.fakeArr = Array.from({ length: 15 });
  }

  ngOnInit(): void {
    this.getCurrentPosition();
    this.getMyLocationList();
  }

  private getMyLocationList() {
    const cityListArr = this.storageService.getItem(LOCATION_LIST);
    if (cityListArr) {
      async.eachSeries(
        cityListArr,
        (city, callback) => {
          this.unsplashService
            .getPhotoByCityName(city.description, 'portrait')
            .subscribe(
              (response: any) => {
                if (response) {
                  const images = response.results;
                  if (images) {
                    if (images[0]) {
                      city.image = images[0].urls;
                    }
                    callback();
                  }
                }
              },
              (error) => {
                console.log('getPhotoByCityName error: ', error);
                callback();
              }
            );
        },
        () => {
          this.cityListArr = cityListArr;
          console.log('this.cityListArr: ', this.cityListArr);
        }
      );
    }
  }

  async getCurrentPosition() {
    this.zone.run(() => {
      Geolocation.getCurrentPosition().then((coordinates) => {
        console.log('Current', coordinates);
      });
    });
  }

  doRefresh(event) {
    this.showData = false;
    this.cityListArr = [];

    this.getMyLocationList();

    this.showData = true;
    if (event && event.target) {
      event.target.complete();
    }
  }

  onWeatherItemClick(location: any) {
    this.navCtrl.navigateForward('/detail', {
      queryParams: {
        location: JSON.stringify(location),
      },
    });
  }

  async onShowSearch() {
    this.showSearch = true;
    const modal = await this.modalController.create({
      component: SearchModalComponent,
    });
    modal.onDidDismiss().then((resp: any) => {
      this.doRefresh(null);
    });
    modal.present();
  }

  onCancelSearch() {
    this.showSearch = false;
  }
}
