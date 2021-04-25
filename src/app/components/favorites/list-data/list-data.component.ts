import { Component, Input, OnInit } from '@angular/core';
import { Favorite } from '../../home/weather';

@Component({
  selector: 'pm-list-data',
  templateUrl: './list-data.component.html',
  styleUrls: ['./list-data.component.css'],
})
export class ListDataComponent implements OnInit {
  @Input() favoritesList: Favorite[];

  constructor() {}

  ngOnInit(): void {}
}
