import { Component, Input, OnInit, ChangeDetectionStrategy, Output, EventEmitter } from '@angular/core';
import { Autocomplete, CurrentConditions, FiveDaysForecasts, Favorite } from '../weather';
import { FlashMessagesService } from 'angular2-flash-messages';

@Component({
  selector: 'pm-weather-info',
  templateUrl: './weather-info.component.html',
  styleUrls: ['./weather-info.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class WeatherResultsComponent implements OnInit {
  @Input() selectedLocation: Autocomplete;
  @Input() autocompletedList: Autocomplete[];
  @Input() currentConditions: CurrentConditions[];
  @Input() fiveDaysForecasts: FiveDaysForecasts[];
  @Input() favoritesList: Favorite[];

  @Output() addSelectedLocation = new EventEmitter<Favorite>();

  displayCurrentUnit = -1;
  isShowMetric = true;

  constructor(private fm: FlashMessagesService) {}

  ngOnInit(): void {}

  ngOnChanges(): void {
    this.displayCurrentUnit = this.currentConditions[0]?.Temperature?.Metric?.Value;
  }

  addToFavorites(): void {
    const location = {
      Key: this.autocompletedList[0].Key,
      LocalizedName: this.autocompletedList[0].LocalizedName,
      WeatherText: this.currentConditions[0].WeatherText,
      Temperature: this.currentConditions[0].Temperature,
    };

    if (!this.favoritesList.find((l) => l.Key === location.Key)) {
      this.addSelectedLocation.emit(location);
    } else {
      this.displayUserMessage('Location has been already added..');
    }
  }

  toggleUnit(unit: string) {
    if (unit === 'c') {
      this.isShowMetric = true;
      this.displayCurrentUnit = this.currentConditions[0]?.Temperature?.Metric?.Value;
    } else {
      this.isShowMetric = false;
      this.displayCurrentUnit = this.currentConditions[0]?.Temperature?.Imperial?.Value;
    }
  }

  displayUserMessage(errorMessage?: string): void {
    this.fm.show(errorMessage, {
      cssClass: 'alert-danger',
      timeout: 4000,
    });
  }
}
