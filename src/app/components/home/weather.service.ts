import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { combineLatest, Observable, throwError } from 'rxjs';
import { catchError, tap, map, shareReplay, take, debounceTime, switchMap, takeUntil, skip } from 'rxjs/operators';

import { Autocomplete, CurrentConditions, Favorite, FiveDaysForecasts } from './weather';

import { environment } from '../../../environments/environment';

@Injectable({
  providedIn: 'root',
})
export class WeatherService {
  baseUrl = environment.baseUrl;
  constructor(private http: HttpClient) {}

  geolocationObservable(options): Observable<Object> {
    return new Observable((observer) => {
      // This function is called when someone subscribes.

      const id = navigator.geolocation.watchPosition(
        (position) => {
          observer.next(position);
        },
        (error) => {
          observer.error(error);
        },
        options
      );

      // Our teardown function. Will be called if they unsubscribe
      return () => {
        navigator.geolocation.clearWatch(id);
      };
    });
  }

  getLocationDetails(): Observable<Location> {
    return this.geolocationObservable({
      enableHighAccuracy: true,
      timeout: 5000,
      maximumAge: 0,
    }).pipe(
      switchMap((position: any) => {
        const latitude = position.coords.latitude;
        const longitude = position.coords.longitude;

        return this.http.get<Location>(
          `https://api.bigdatacloud.net/data/reverse-geocode-client?latitude=${latitude}&longitude=${longitude}&localityLanguage=en`
        );
      }),
      tap((data) => console.log('Location Data: ', JSON.stringify(data)))
    );
  }

  getAutoCompleted(term: string): Observable<Autocomplete[]> {
    return this.http.get<Autocomplete[]>(`${this.baseUrl}/v1/cities/autocomplete?q=${term}&apikey=${environment.apiKey}`).pipe(
      tap((data) => console.log('Data: ', JSON.stringify(data))),
      catchError(this.handleError)
    );
  }

  getCurrentConditions(locationKey: string): Observable<CurrentConditions[]> {
    return this.http.get<any[]>(`${this.baseUrl}/currentconditions/v1/${locationKey}?apikey=${environment.apiKey}`).pipe(
      tap((data) => console.log('Data: ', JSON.stringify(data))),
      catchError(this.handleError)
    );
  }

  getFiveDaysForecasts(locationKey: string): Observable<FiveDaysForecasts[]> {
    return this.http.get<FiveDaysForecasts[]>(`${this.baseUrl}/forecasts/v1/daily/5day/${locationKey}?apikey=${environment.apiKey}`).pipe(
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
