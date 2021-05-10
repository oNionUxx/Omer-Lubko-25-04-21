import { Component, Input, Output, EventEmitter, ChangeDetectionStrategy, SimpleChange, SimpleChanges } from '@angular/core';

import { FlashMessagesService } from 'angular2-flash-messages';

import { Autocomplete } from '../weather';

@Component({
  selector: 'pm-weather-search',
  templateUrl: './weather-search.component.html',
  styleUrls: ['./weather-search.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class WeatherSearchComponent {
  keyword = 'LocalizedName';

  @Input() autocompletedList: Autocomplete[];
  @Input() currentLocationKey: string;
  @Input() errorMessage: string;

  @Output() listToBeFiltered = new EventEmitter<string>();
  @Output() locationWasSelected = new EventEmitter<string>();
  @Output() changedAutocompletedList = new EventEmitter<Autocomplete[]>();

  constructor(private fm: FlashMessagesService) {}

  onChangeSearch(value) {
    // fetch remote data from here
    // and reassign the 'data' which is bind to 'data' property.
    const q = value.trim();
    const pattern = /^[a-zA-Z&']+(?:[\s-][a-zA-Z]+)*$/;

    // check for matched pattern
    if (pattern.test(q)) {
      this.changedAutocompletedList.emit(q);
    }
  }

  selectEvent(item) {
    // do something with selected item
    this.locationWasSelected.emit(item.Key);
    this.listToBeFiltered.emit(item.Key);
  }

  onFocused(e) {
    // do something when input is focused
  }

  displayUserMessage(errorMessage?: string): void {
    this.fm.show(errorMessage, {
      cssClass: 'alert-danger',
      timeout: 4000,
    });
  }
}
