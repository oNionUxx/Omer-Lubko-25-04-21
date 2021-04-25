import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { combineLatest, Observable, throwError } from 'rxjs';
import { catchError, tap, map, shareReplay, take, debounceTime, switchMap, takeUntil, skip } from 'rxjs/operators';

import { Autocomplete } from './weather';

import { environment } from '../../../environments/environment';

@Injectable({
  providedIn: 'root',
})
export class WeatherService {
  private autoComplete$: Observable<any>;

  constructor(private http: HttpClient) {}

  getAutoCompleted(term: string): Observable<Autocomplete[]> {
    return this.http
      .get<Autocomplete[]>(`https://dataservice.accuweather.com/locations/v1/cities/autocomplete?q=${term}&apikey=${environment.apiKey}`)
      .pipe(
        tap((data) => console.log('Data: ')),
        catchError(this.handleError)
      );
  }

  getCurrentConditions(locationKey: string): Observable<any[]> {
    return this.http
      .get<any[]>(`https://dataservice.accuweather.com/currentconditions/v1/${locationKey}?apikey=${environment.apiKey}`)
      .pipe(
        tap((data) => console.log('Data: ')),
        catchError(this.handleError)
      );
  }

  getFiveDaysForecasts(locationKey: string): Observable<any[]> {
    return this.http
      .get<any[]>(`https://dataservice.accuweather.com/forecasts/v1/daily/5day/${locationKey}?apikey=${environment.apiKey}`)
      .pipe(
        tap((data) => console.log('Five Days forecasts: ', JSON.stringify(data))),
        catchError(this.handleError)
      );
  }

  private handleError(err: any) {
    // in a real world app, we may send the server to some remote logging infrastructure
    // instead of just logging it to the console
    let errorMessage: string;
    if (err.error instanceof ErrorEvent) {
      // A client-side or network error occurred. Handle it accordingly.
      errorMessage = `An error occurred: ${err.error.message}`;
    } else {
      // The backend returned an unsuccessful response code.
      // The response body may contain clues as to what went wrong,
      errorMessage = `Backend returned code ${err.status}: ${err.body.error}`;
    }
    console.error(err);
    return throwError(errorMessage);
  }
}
