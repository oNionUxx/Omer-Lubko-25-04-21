export interface Autocomplete {
  version: number;
  Key: string;
  Type: string;
  Rank: number;
  LocalizedName: string;
  Country: Country;
  AdministrativeArea: AdministrativeArea;
}

export interface Country {
  ID: string;
  LocalizedName: string;
}

export interface AdministrativeArea {
  ID: string;
  LocalizedName: string;
}

export interface CurrentConditions {
  EpochTime: number;
  HasPrecipitation: boolean;
  IsDayTime: boolean;
  Link: string;
  LocalObservationDateTime: string;
  MobileLink: string;
  PrecipitationType: string;
  Temperature: Temperature;
  WeatherIcon: number;
  WeatherText: string;
}

export interface Favorite {
  Key: string;
  LocalizedName: string;
  WeatherText: string;
  Temperature: Temperature;
}

export interface Temperature {
  Imperial: Imperial;
  Metric: Metric;
}

export interface Imperial {
  Unit: string;
  UnitType: number;
  Value: number;
}

export interface Metric {
  Unit: string;
  UnitType: number;
  Value: number;
}

export interface FiveDaysForecasts {
  DailyForecasts: [
    {
      Date: string;
      Day: Day;
      EpochDate: number;
      Link: string;
      MobileLink: string;
      Night: Night;
      Sources: string[];
      Temperature: {
        Maximum: Maximum;
        Minimum: Minimum;
      };
    }
  ];
  Headline: Headline;
}

export interface Headline {
  Category: string;
  EffectiveDate: string;
  EffectiveEpochDate: number;
  EndDate: string;
  EndEpochDate: number;
  MobileLink: string;
  Severity: number;
  Text: string;
}

export interface Day {
  HasPrecipitation: boolean;
  Icon: number;
  IconPhrase: string;
}

export interface Night {
  HasPrecipitation: boolean;
  Icon: number;
  IconPhrase: string;
}

export interface Maximum {
  Unit: string;
  UnitType: number;
  Value: number;
}

export interface Minimum {
  Unit: string;
  UnitType: number;
  Value: number;
}

export interface Icon {
  Key: string;
  Icon: string;
}
