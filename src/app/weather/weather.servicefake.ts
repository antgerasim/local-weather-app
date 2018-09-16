import { ICurrentWeather } from './../interfaces'
import { IWeatherService } from './weather.service'
import { Observable, of } from 'rxjs'

export class WeatherServiceFake implements IWeatherService {
  private fakeWeather: ICurrentWeather = {
    city: 'Bursa',
    country: 'TR',
    date: 1485789600,
    image: '',
    temperature: 280.32,
    description: 'light intensity drizzle',
  }

  getCurrentWeather(city: string, country: string): Observable<ICurrentWeather> {
    //throw new Error('Method not implemented.')
    return of(this.fakeWeather) // of turns fakeweather into observable
  }
}
