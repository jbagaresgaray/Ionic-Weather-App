import {
  Component,
  OnInit,
  ViewEncapsulation,
  Input,
  Output,
  EventEmitter,
} from '@angular/core';
import { UnsplashService } from './../../services/unsplash.service';

@Component({
  selector: 'app-place-card-item',
  encapsulation: ViewEncapsulation.None,
  templateUrl: './place-card-item.component.html',
  styleUrls: ['./place-card-item.component.scss'],
})
export class PlaceCardItemComponent implements OnInit {
  // tslint:disable-next-line:no-output-on-prefix
  @Output() onCardClick = new EventEmitter();
  @Input() city: string;
  @Input() description: string;

  cardImage: string;

  constructor(private unsplashService: UnsplashService) {}

  ngOnInit(): void {
    this.getImageInfo();
  }

  private getImageInfo() {
    this.unsplashService.getPhotoByCityName(this.description, 'portrait').subscribe(
      (response: any) => {
        if (response) {
          const images = response.results;
          if (images) {
            console.log('images: ', images);
            if (images[0]) {
              this.cardImage = images[0].urls.small;
              console.log('this.cardImage: ', this.cardImage);
            }
          }
        }
      },
      (error) => {
        console.log('getPhotoByCityName error: ', error);
      }
    );
  }

  cardClick(event: any) {
    this.onCardClick.emit(event);
  }
}
