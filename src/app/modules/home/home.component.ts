import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { NavController } from '@ionic/angular';
import { Plugins } from '@capacitor/core';

import { PLACES } from './../../shared/constants/places.constant';

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

  constructor(private navCtrl: NavController) {
    this.fakeArr = Array.from({ length: 15 });
  }

  ngOnInit(): void {
    this.cityListArr = PLACES;

    this.getCurrentPosition();
  }

  async getCurrentPosition() {
    const coordinates = await Geolocation.getCurrentPosition();
    console.log('Current', coordinates);
  }

  doRefresh(event) {
    this.showData = false;
    this.cityListArr = [];

    setTimeout(() => {
      console.log('Async operation has ended');
      this.cityListArr = PLACES;
      this.showData = true;
      event.target.complete();
    }, 2000);
  }

  onWeatherItemClick() {
    this.navCtrl.navigateForward('/detail');
  }

  onShowSearch() {
    this.showSearch = true;
  }

  onCancelSearch() {
    this.showSearch = false;
  }
}
