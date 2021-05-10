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
  @Input() errorMessage: string;
  @Input() currentLocationKey: string;
  @Input() favoritesList: Favorite[];
  @Input() autocompletedList: Autocomplete[];
  @Input() currentConditions: CurrentConditions[];
  @Input() fiveDaysForecasts: FiveDaysForecasts[];

  @Output() addSelectedLocation = new EventEmitter<Favorite>();

  found: any;
  isShowMetric = true;
  displayCurrentUnit = -1;
  displayLocationName = 'Tel Aviv';

  constructor(private fm: FlashMessagesService) {}

  ngOnInit(): void {}

  ngOnChanges(changes: SimpleChanges): void {
    if (changes.currentConditions && changes.currentConditions.currentValue[0]) {
      this.displayCurrentUnit = changes.currentConditions.currentValue[0].Temperature.Metric.Value;
    }

    if (changes.autocompletedList && changes.autocompletedList.currentValue[0] && !changes.autocompletedList.firstChange) {
      this.displayLocationName = changes.autocompletedList.currentValue[0].LocalizedName;
    }

    this.found = this.favoritesList.find((value) => value.Key === this.currentLocationKey);
  }

  addToFavorites(): void {
    const location = {
      Key: this.autocompletedList[0].Key,
      LocalizedName: this.autocompletedList[0].LocalizedName,
      WeatherText: this.currentConditions[0].WeatherText,
      Temperature: this.currentConditions[0].Temperature,
    };

    this.addSelectedLocation.emit(location);
  }

  toggleUnit(unit: string) {
    if (unit === 'c') {
      this.displayCurrentUnit = this.currentConditions[0]?.Temperature.Metric?.Value;
    } else {
      this.displayCurrentUnit = this.currentConditions[0]?.Temperature.Imperial?.Value;
    }
    this.isShowMetric = !this.isShowMetric;
  }

  displayUserMessage(errorMessage?: string): void {
    this.fm.show(errorMessage, {
      cssClass: 'alert-danger',
      timeout: 4000,
    });
  }
}
