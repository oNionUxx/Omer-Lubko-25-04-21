import { Component, OnInit, Input, Output, EventEmitter, ChangeDetectionStrategy } from '@angular/core';

import { Autocomplete } from '../weather';

@Component({
  selector: 'pm-weather-search',
  templateUrl: './weather-search.component.html',
  styleUrls: ['./weather-search.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class WeatherSearchComponent implements OnInit {
  @Input() autocompletedList: Autocomplete[];
  @Input() selectedLocation: Autocomplete;
  @Input() errorMessage: string;

  @Output() listToBeFiltered = new EventEmitter<string>();
  @Output() locationWasSelected = new EventEmitter<Autocomplete>();
  @Output() changedAutocompletedList = new EventEmitter<Autocomplete[]>();

  ngOnInit(): void {}

  showDropdownList = false;
  data: string;

  ngOnInt(): void {}

  ngOnChanges(): void {
    if (this.selectedLocation) {
      this.data = this.selectedLocation.LocalizedName;
    }
  }

  searchItem(event): void {
    // check for matched pattern
    let pattern = /^[a-zA-Z]+(?:[\s-][a-zA-Z]+)*$/;
    let q = event.target.value;

    if (q.match(pattern) && q !== '') {
      this.changedAutocompletedList.emit(q);
    }

    this;
  }

  selectItem(location: Autocomplete): void {
    this.locationWasSelected.emit(location);
    this.clearItem(location);
    this.toggleDropdownList();
  }

  clearItem(location: Autocomplete): void {
    this.listToBeFiltered.emit(location.Key);
  }

  toggleDropdownList(): void {
    this.showDropdownList = !this.showDropdownList;
  }
}
