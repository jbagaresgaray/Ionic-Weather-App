import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import {
  ModalController,
  Platform,
  ActionSheetController,
  ToastController,
} from '@ionic/angular';
import isEmpty from 'lodash-es/isEmpty';
import each from 'lodash-es/each';
import isArray from 'lodash-es/isArray';
import { Plugins } from '@capacitor/core';

import { WeatherService } from './../../shared/services/weather.service';
import { StorageService } from './../../shared/services/storage.service';
import { LOCATION_LIST } from './../../shared/constants/places.constant';

declare const google: any;
@Component({
  selector: 'app-search-modal',
  encapsulation: ViewEncapsulation.None,
  templateUrl: './search-modal.component.html',
  styleUrls: ['./search-modal.component.scss'],
})
export class SearchModalComponent implements OnInit {
  locationListArr: any[] = [];
  fakeArr: any[] = [];

  mapCenter: any;
  isSearching = false;

  constructor(
    private platform: Platform,
    private modalController: ModalController,
    private actionSheetController: ActionSheetController,
    private toastController: ToastController,
    private weatherService: WeatherService,
    private storageService: StorageService
  ) {
    this.fakeArr = Array.from({ length: 20 });
  }

  ngOnInit(): void {}

  doRefresh(event) {
    setTimeout(() => {
      console.log('Async operation has ended');
      event.target.complete();
    }, 2000);
  }

  async getCurrentPosition() {
    if (this.platform.is('cordova') || this.platform.is('capacitor')) {
      const coordinates = await Plugins.Geolocation.getCurrentPosition();
      this.mapCenter = {
        lat: coordinates.coords.latitude,
        lng: coordinates.coords.longitude,
      };
    } else {
      const success = (pos) => {
        const crd = pos.coords;
        this.mapCenter = new google.maps.LatLng(crd.latitude, crd.longitude);
      };

      const error = (err) => {
        console.warn(`ERROR(${err.code}): ${err.message}`);
      };

      navigator.geolocation.getCurrentPosition(success, error, {
        enableHighAccuracy: true,
        timeout: 5000,
        maximumAge: 0,
      });
    }
  }

  onSearchLocation(event: any): void {
    const searchText = event.target.value;
    if (!isEmpty(searchText)) {
      this.isSearching = true;

      this.weatherService
        .searchGooglePlaces(searchText, this.mapCenter)
        .then((places) => {
          if (places) {
            this.locationListArr = [];
            each(places, (row) => {
              this.locationListArr.push({
                id: row.id,
                place_id: row.place_id,
                title: row.structured_formatting.main_text,
                subtitle: row.structured_formatting.secondary_text,
                description: row.description,
                distance_meters: row.distance_meters,
                structured_formatting: row.structured_formatting,
                terms: row.terms,
                types: row.types,
              });
            });
            console.log('this.locationListArr: ', this.locationListArr);
            this.isSearching = false;
          } else {
            this.isSearching = false;
            this.locationListArr = [];
          }
        });
    } else {
      this.locationListArr = [];
    }
  }

  dismiss() {
    this.modalController.dismiss();
  }

  async presentActionSheet(location: any) {
    const actionSheet = await this.actionSheetController.create({
      header: 'Select a City',
      buttons: [
        {
          text: 'Add to My list',
          handler: () => {
            console.log('Favorite clicked');
            this.addPlaceToMyList(location);
          },
        },
        {
          text: 'Cancel',
          role: 'cancel',
          handler: () => {
            console.log('Cancel clicked');
          },
        },
      ],
    });
    await actionSheet.present();
  }

  private async addPlaceToMyList(location) {
    const locations: any = this.storageService.getItem(LOCATION_LIST);
    console.log('locations: ', locations);
    if (locations && isArray(locations)) {
      locations.push(location);
      this.storageService.setItem(LOCATION_LIST, locations);
    } else {
      const newArray: any[] = [];
      newArray.push(location);
      this.storageService.setItem(LOCATION_LIST, newArray);
    }

    const toast = await this.toastController.create({
      message: 'Place added to My List',
      duration: 2000,
      position: 'top',
    });
    toast.present();
  }
}
