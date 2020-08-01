import { Component, OnInit, ViewEncapsulation } from '@angular/core';

@Component({
  selector: 'app-detail',
  encapsulation: ViewEncapsulation.None,
  templateUrl: './detail.component.html',
  styleUrls: ['./detail.component.scss'],
})
export class DetailComponent implements OnInit {
  constructor() {}

  ngOnInit(): void {}
}
