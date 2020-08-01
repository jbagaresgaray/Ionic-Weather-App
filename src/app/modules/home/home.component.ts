import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { NavController } from '@ionic/angular';

@Component({
  selector: 'app-home',
  encapsulation: ViewEncapsulation.None,
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})
export class HomeComponent implements OnInit {
  cityListArr: any[] = [];

  constructor(private navCtrl: NavController) {}

  ngOnInit(): void {
    this.cityListArr = [
      {
        id: 1,
        name: 'San Francisco',
      },
      {
        id: 2,
        name: 'London',
      },
      {
        id: 3,
        name: 'Tokyo',
      },
      {
        id: 4,
        name: 'New York',
      },
    ];
  }

  doRefresh(event) {
    console.log('Begin async operation');

    setTimeout(() => {
      console.log('Async operation has ended');
      event.target.complete();
    }, 2000);
  }

  onWeatherItemClick() {
    this.navCtrl.navigateForward('/detail');
  }
}
