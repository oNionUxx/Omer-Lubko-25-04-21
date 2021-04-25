import { Component, Input, OnInit, Output, EventEmitter, ChangeDetectionStrategy } from '@angular/core';
import { Favorite } from '../../home/weather';

@Component({
  selector: 'pm-list-data',
  templateUrl: './list-data.component.html',
  styleUrls: ['./list-data.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ListDataComponent implements OnInit {
  @Input() favoritesList: Favorite[];
  @Output() selectedItem = new EventEmitter<Favorite>();

  constructor() {}

  ngOnInit(): void {}

  selectItem(item: Favorite) {
    this.selectedItem.emit(item);
  }
}
