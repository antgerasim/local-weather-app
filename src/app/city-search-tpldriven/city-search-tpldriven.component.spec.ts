import { async, ComponentFixture, TestBed } from '@angular/core/testing'
import { MatIconModule, MatInputModule } from '@angular/material'
import { CitySearchTpldrivenComponent } from './city-search-tpldriven.component'
import { FormsModule } from '@angular/forms'
import { WeatherService } from '../weather/weather.service'
import { HttpClientModule } from '@angular/common/http'
import { BrowserAnimationsModule } from '@angular/platform-browser/animations'



describe('CitySearchTpldrivenComponent', () => {
  let component: CitySearchTpldrivenComponent
  let fixture: ComponentFixture<CitySearchTpldrivenComponent>

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [MatIconModule, MatInputModule, FormsModule, HttpClientModule, BrowserAnimationsModule],
      declarations: [CitySearchTpldrivenComponent],
      providers: [WeatherService],
    }).compileComponents()
  }))

  beforeEach(() => {
    fixture = TestBed.createComponent(CitySearchTpldrivenComponent)
    component = fixture.componentInstance
    fixture.detectChanges()
  })

  it('should create', () => {
    expect(component).toBeTruthy()
  })
})
