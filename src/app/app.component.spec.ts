import { WeatherService } from './weather/weather.service'
import { TestBed, async } from '@angular/core/testing'
import { AppComponent } from './app.component'
import { CurrentWeatherComponent } from './current-weather/current-weather.component'
import { HttpClientModule } from '@angular/common/http'

describe('AppComponent', () => {
  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientModule],
      declarations: [AppComponent, CurrentWeatherComponent],
      providers: [WeatherService],
    }).compileComponents()
  }))
  it('should create the app', async(() => {
    const fixture = TestBed.createComponent(AppComponent)
    const app = fixture.debugElement.componentInstance
    expect(app).toBeTruthy()
  }))
  it(`should have as title 'local-weather-app'`, async(() => {
    const fixture = TestBed.createComponent(AppComponent)
    const app = fixture.debugElement.componentInstance
    expect(app.title).toEqual('local-weather-app')
  }))
  it('should render title in a h1 tag', async(() => {
    const fixture = TestBed.createComponent(AppComponent)
    fixture.detectChanges()
    const compiled = fixture.debugElement.nativeElement
    expect(compiled.querySelector('h1').textContent).toContain(
      //'Welcome to local-weather-app!'
      'LocalCast Weather'
    )
  }))
})
