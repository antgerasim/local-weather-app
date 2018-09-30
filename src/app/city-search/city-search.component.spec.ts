import { async, ComponentFixture, TestBed } from '@angular/core/testing'
import { MatIconModule, MatInputModule, MatFormFieldModule } from '@angular/material'
import { CitySearchComponent } from './city-search.component'
import { FormsModule, ReactiveFormsModule } from '@angular/forms'
import { WeatherService } from '../weather/weather.service'
import { HttpClientModule } from '@angular/common/http'
import { BrowserAnimationsModule } from '@angular/platform-browser/animations'

describe('CitySearchComponent', () => {
  let component: CitySearchComponent
  let fixture: ComponentFixture<CitySearchComponent>

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [MatIconModule, MatInputModule, FormsModule, ReactiveFormsModule, MatFormFieldModule, HttpClientModule, BrowserAnimationsModule],
      declarations: [CitySearchComponent],
      providers: [WeatherService],
    }).compileComponents()
  }))

  beforeEach(() => {
    fixture = TestBed.createComponent(CitySearchComponent)
    component = fixture.componentInstance
    fixture.detectChanges()
  })

  it('should create', () => {
    expect(component).toBeTruthy()
  })
})

/*Even this component uses ReactiveFormsModule, FormsModule MUST be imported!*/
