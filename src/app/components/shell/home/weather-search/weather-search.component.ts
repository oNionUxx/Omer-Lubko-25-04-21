import { Component, OnInit, Input, Output, EventEmitter, ChangeDetectionStrategy, SimpleChanges, OnChanges } from '@angular/core';

import { FormGroup, FormBuilder, Validators, FormControl } from '@angular/forms';

import { FlashMessagesService } from 'angular2-flash-messages';

import { Autocomplete } from '../weather';

@Component({
  selector: 'pm-weather-search',
  templateUrl: './weather-search.component.html',
  styleUrls: ['./weather-search.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class WeatherSearchComponent implements OnInit, OnChanges {
  customForm: FormGroup;

  @Input() errorMessage: string;
  @Input() selectedLocation: Autocomplete;
  @Input() autocompletedList: Autocomplete[];

  @Output() locationWasSelected = new EventEmitter<string>();
  @Output() changedAutocompletedList = new EventEmitter<Autocomplete[]>();

  constructor(private fm: FlashMessagesService, private fb: FormBuilder) {
    this.customForm = this.fb.group({
      keyword: 'LocalizedName',
      LocalizedName: ['', Validators.pattern(/^[a-zA-Z&']+(?:[\s-][a-zA-Z]+)*$/)],
    });
  }

  ngOnInit(): void {}

  ngOnChanges(changes: SimpleChanges): void {
    // patch form with value from the store
    if (this.selectedLocation) {
      const locationName = this.selectedLocation as Autocomplete;
      this.populateForm(locationName);
    }
  }

  populateForm(location: Autocomplete) {
    // update the data on the form
    this.customForm.patchValue({
      LocalizedName: location.LocalizedName || null,
    });
  }

  onChangeSearch(value) {
    // fetch remote data from here and reassign
    // the 'autocompleted list' which is bind to 'data' property.
    const q = value.trim();

    if (q !== '') {
      this.changedAutocompletedList.emit(q);
    }
  }

  selectEvent(item) {
    // do something with selected item
    this.locationWasSelected.emit(item.Key);
  }

  // Also validate on blur
  // Helpful if the user tabs through required fields
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
