import { Component, Input, OnInit, ChangeDetectionStrategy, Output, EventEmitter, SimpleChange, SimpleChanges } from '@angular/core';
import { Autocomplete, CurrentConditions, FiveDaysForecasts, Favorite } from '../weather';
import { FlashMessagesService } from 'angular2-flash-messages';

@Component({
  selector: 'pm-weather-info',
  templateUrl: './weather-info.component.html',
  styleUrls: ['./weather-info.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class WeatherResultsComponent implements OnInit {
  found: any;
  isShowMetric = true;
  prevLocalizedName: string;

  @Input() errorMessage: string;
  @Input() selectedLocation: Autocomplete;
  @Input() favoritesList: Favorite[];
  @Input() currentConditions: CurrentConditions;
  @Input() fiveDaysForecasts: FiveDaysForecasts;

  @Output() addSelectedLocation = new EventEmitter<Favorite>();

  constructor(private fm: FlashMessagesService) {}

  ngOnInit(): void {}

  ngOnChanges(changes: SimpleChanges): void {
    if (changes.favoritesList) {
      this.found = this.favoritesList.find((value) => value.Key === this.selectedLocation.Key);
    }

    if (changes.selectedLocation && changes.selectedLocation.previousValue) {
      this.prevLocalizedName = changes.selectedLocation.previousValue.LocalizedName;
    }
  }

  addToFavorites(): void {
    const location = {
      Key: this.selectedLocation.Key,
      LocalizedName: this.selectedLocation.LocalizedName,
      WeatherText: this.currentConditions.WeatherText,
      Temperature: this.currentConditions.Temperature,
    };

    this.addSelectedLocation.emit(location);
  }

  displayUserMessage(errorMessage?: string): void {
    this.fm.show(errorMessage, {
      cssClass: 'alert-danger',
      timeout: 4000,
    });
  }
}
