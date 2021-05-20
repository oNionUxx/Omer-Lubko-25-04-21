import { Component, Input, OnInit, ChangeDetectionStrategy, Output, EventEmitter, SimpleChange, SimpleChanges } from '@angular/core';
import { Favorite } from '../weather';
import { FlashMessagesService } from 'angular2-flash-messages';
import { ViewModel, WeatherState } from '../state/weather.state';

@Component({
  selector: 'pm-weather-info',
  templateUrl: './weather-info.component.html',
  styleUrls: ['./weather-info.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class WeatherResultsComponent implements OnInit {
  found: any;
  isShowMetric = true;
  prevLocalizedName: string;

  @Input() vm: ViewModel;
  @Input() favoritesList: Favorite[];
  @Output() addSelectedLocation = new EventEmitter<Favorite>();

  constructor(private fm: FlashMessagesService) {}

  ngOnInit(): void {}

  ngOnChanges(changes: SimpleChanges): void {
    if (changes.vm) {
      this.found = this.favoritesList.find((value) => value.Key === this.vm.selectedLocation.Key);
      console.log();

      if (changes.vm.previousValue && changes.vm.previousValue.selectedLocation) {
        this.prevLocalizedName = changes.vm.previousValue.selectedLocation.LocalizedName;
      }
    }
  }

  addToFavorites(): void {
    const location = {
      Key: this.vm.selectedLocation.Key,
      LocalizedName: this.vm.selectedLocation.LocalizedName,
      WeatherText: this.vm.currentConditions[0].WeatherText,
      Temperature: this.vm.currentConditions[0].Temperature,
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
