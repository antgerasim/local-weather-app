//import { IWeatherService } from './weather.service'
import { Injectable } from '@angular/core'
import { HttpClient } from '@angular/common/http'
import { environment } from '../../environments/environment'

import { ICurrentWeather } from '../interfaces'
import { Observable } from 'rxjs'
import { map } from 'rxjs/operators'
import { ICurrentWeatherData } from './ICurrentWeatherData'
//import {do} from 'rxjs/operators'

@Injectable({
  providedIn: 'root',
})
export class WeatherService implements IWeatherService {
  constructor(private httpClient: HttpClient) {
    /*     this.getJSON().subscribe(data => {
      console.log(data)
    }) */
  }
  //Update getCurrentWeather
  //1.define return type to be observable<ICurrentWeatherData>
  //2. write helperfunctions
  //3. Update ICurrentWeather.date to the number type
  //4. Apply the map function to data stream returned by  httpClient.get method through a //pipe
  //5. Pass the data object into the transformToICurrentWeather function:

  getCurrentWeather(
    search: string | number,
    country?: string
  ): Observable<ICurrentWeather> {
    let uriParams = ''
    if (typeof search === 'string') {
      uriParams = `q=${search}`
    } else {
      uriParams = `zip=${search}`
    }

    if (country) {
      uriParams = `${uriParams},${country}`
    }

    return this.getCurrentWeatherHelper(uriParams)
  }

  getCurrentWeatherByCoords(coords: Coordinates): Observable<ICurrentWeather> {
    const uriParams = `lat=${coords.latitude}&lon=${coords.longitude}`
    return this.getCurrentWeatherHelper(uriParams)
  }

  private getCurrentWeatherHelper(uriParams: string): Observable<ICurrentWeather> {
    return (
      this.httpClient
        .get<ICurrentWeatherData>(
          `${environment.baseUrl}api.openweathermap.org/data/2.5/weather?` +
            `${uriParams}&appid=${environment.appId}`
        )
        //.do(data => console.log('HTTP response:', data))
        .pipe(map(data => this.transformToICurrentWeather(data)))
    )
  }

  getJSON(): Observable<ICurrentWeather> {
    //const data: any  = require('app/weather/apiresponse.json') C:\Dev\local-weather-app\src\app\weather\apiresponse.json
    return this.httpClient
      .get<ICurrentWeatherData>('src/data/apiresponse.json') // 404 error - must be configured in angular.json 'assets'
      .pipe(map(data => this.transformToICurrentWeather(data)))
  }

  private transformToICurrentWeather(data: ICurrentWeatherData): ICurrentWeather {
    return {
      city: data.name,
      country: data.sys.country,
      date: data.dt * 1000,
      image: `http://openweathermap.org/img/w/${data.weather[0].icon}.png`,
      //image: `http://openweathermap.org/img/w/50d.png`, hard code check
      temperature: this.convertKelvinToFahrenheit(data.main.temp),
      description: data.weather[0].description,
    }
  }

  private convertKelvinToFahrenheit(kelvin: number): number {
    return (kelvin * 9) / 5 - 459.67
  }
}
export interface IWeatherService {
  getCurrentWeather(city: string, country: string): Observable<ICurrentWeather>
  getCurrentWeatherByCoords(coords: Coordinates): Observable<ICurrentWeather>
}
