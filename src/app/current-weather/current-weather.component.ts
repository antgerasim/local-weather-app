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
  geolocationPosition: any
  // coords: Coordinates

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
    if (window.navigator && window.navigator.geolocation) {
      window.navigator.geolocation.getCurrentPosition(
        position => {
          console.log(position)
          //if no geolocation, get last choosen city from browser localstorage
          if (this.isObjectEmpty(position)) {
            const oldLocation = this.getLocalStorageItem('lastCity');
            console.log('oldLocation', oldLocation)
            //if user is first time, get geolocation data
            if (oldLocation.length === 0) {
              //if user refues to give his location data, set default
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
          } else { //we have location
            const localCoords: Coordinates = {
              latitude: position.coords.latitude,
              longitude: position.coords.longitude,
              accuracy: 0,
              altitude: 0,
              altitudeAccuracy: 0,
              heading: 0,
              speed: 0
            }

            this.weatherService
              .getCurrentWeatherByCoords(localCoords)
              .subscribe(data => {
                this.setLocalStorageItem('lastCity', data)
                this.current = data
              })
            //set currentPosition as current
          }
        },
        error => {
          switch (error.code) {
            case 1:
              console.log('Permission Denied');
              break
            case 2:
              console.log('Position Unavailable');
              break;
            case 3:
              console.log('Timeout');
              break;
          }
        }
      )
    }

    this.weatherService.currentWeather
      .subscribe(data => {
        //debugger
        console.log('data', data)
        if (data.city !== '--') {
          this.current = data

          this.setLocalStorageItem('lastCity', data)
        }
      }),
      // tslint:disable-next-line:no-unused-expression
      error => {
        this.errorMessage = error
      }
  }

  isObjectEmpty(obj) {
    return Object.keys(obj).length === 0 && obj.constructor === Object
  }

  getLocalStorageItem(itemName: string) {
    return JSON.parse(localStorage.getItem(itemName)) || []
  }

  setLocalStorageItem(itemName: string, itemArray: any) {
    localStorage.setItem(itemName, JSON.stringify(itemArray));
  }
}




