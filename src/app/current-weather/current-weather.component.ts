import { Component, OnInit } from '@angular/core'
import { ICurrentWeather } from '../interfaces'
import { WeatherService } from '../weather/weather.service'

@Component({
  selector: 'app-current-weather',
  templateUrl: './current-weather.component.html',
  styleUrls: ['./current-weather.component.css'],
})
export class CurrentWeatherComponent implements OnInit {
  current: ICurrentWeather
  errorMessage: any

  constructor(private weatherService: WeatherService) {
    this.current = {
      city: '',
      country: '',
      date: 0,
      image: '',
      temperature: 0,
      description: '',
    }
  }

  // Attribution: https://stackoverflow.com/a/44418732/178620
  //https://github.com/duluca/local-weather-app/blob/master/src/app/current-weather/current-weather.component.ts
  getOrdinal(date: number) {
    const n = new Date(date).getDate()
    return n > 0
      ? ['th', 'st', 'nd', 'rd'][(n > 3 && n < 21) || n % 10 > 3 ? 0 : n % 10]
      : ''
  }

  ngOnInit() {
    //debugger
    //get last choosen city from browser localstorage
    const oldLocation = JSON.parse(localStorage.getItem('lastCity')) || []
    console.log('oldLocation', oldLocation)
    //if user is first time, get default city
    if (oldLocation.length === 0) {
      this.weatherService
        .getCurrentWeather('Bethesda', 'US')
        .subscribe(data => (this.current = data))
    } else {
      //set oldCity as current
      this.current.city = oldLocation.city
      this.current.country = oldLocation.country
      this.current.date = oldLocation.date
      this.current.image = oldLocation.image
      this.current.temperature = oldLocation.temperature
      this.current.description = oldLocation.description
    }

    this.weatherService.currentWeather
      //.do(data => console.log(data))
      .subscribe(data => {
        if (data.city !== '--') {
          this.current = data
          console.log('data', data)
          localStorage.setItem('lastCity', JSON.stringify(data))
        }
      }),
      // tslint:disable-next-line:no-unused-expression
      error => {
        this.errorMessage = error
      }
    //if no input, take fakedata, otherwise subscribe to input
    /*       this.weatherService
          .getJSON()
          .subscribe(data => (this.current = data)) */

  }
}
