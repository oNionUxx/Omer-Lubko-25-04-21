import { Component, OnInit, Input, Output, EventEmitter, ChangeDetectionStrategy, ViewChild, ElementRef } from '@angular/core';

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
  @Input() showInfoSection: boolean = true;

  @Output() listToBeFiltered = new EventEmitter<string>();
  @Output() locationWasSelected = new EventEmitter<Autocomplete>();
  @Output() changedAutocompletedList = new EventEmitter<Autocomplete[]>();

  @ViewChild('valueRef') valueRef: ElementRef;

  ngOnInit(): void {}

  str = '';
  value = 'Tel Aviv';
  showDropdownList = false;

  ngOnInt(): void {}

  ngOnChanges(): void {}

  searchItem(event): void {
    // check for matched pattern

    let pattern = /^[a-zA-Z]+(?:[\s-][a-zA-Z]+)*$/;
    let q = event.target.value.trim();
    this.showDropdownList = true;

    if (q.includes('No results found'.trim())) {
      this.valueRef.nativeElement.value = '';
    }

    if (q.match(pattern) && q !== '') {
      this.changedAutocompletedList.emit(q);
    }

    if (q === '') {
      this.showDropdownList = false;
    }

    this.valueRef.nativeElement.style.color = '#333';
  }

  selectItem(location: Autocomplete): void {
    this.clearItem(location);
    this.toggleDropdownList();
    this.locationWasSelected.emit(location);
  }

  clearItem(location: Autocomplete): void {
    this.listToBeFiltered.emit(location.Key);
  }

  toggleDropdownList(): void {
    this.showDropdownList = !this.showDropdownList;
  }
}
