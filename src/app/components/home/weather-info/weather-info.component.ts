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

  @Input() errorMessage: string;
  @Input() currentLocationKey: string;
  @Input() favoritesList: Favorite[];
  @Input() autocompletedList: Autocomplete[];
  @Input() currentConditions: CurrentConditions[];
  @Input() fiveDaysForecasts: FiveDaysForecasts[];

  @Output() addSelectedLocation = new EventEmitter<Favorite>();

  constructor(private fm: FlashMessagesService) {}

  ngOnInit(): void {}

  ngOnChanges(): void {
    this.found = this.favoritesList.find((value) => value.Key === this.currentLocationKey);
  }

  addToFavorites(): void {
    const location = {
      Key: this.currentLocationKey,
      LocalizedName: this.autocompletedList[0].LocalizedName,
      WeatherText: this.currentConditions[0].WeatherText,
      Temperature: this.currentConditions[0].Temperature,
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
