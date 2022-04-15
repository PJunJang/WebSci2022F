import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class WeatherService {
  url = 'https://api.openweathermap.org/data/2.5/weather';
  apiKey = 'b756a61f0240767c6fdf5906cdaec009';
  constructor(private http:HttpClient) { }
  getWeatherDataByCoords(lat:any,lon:any){
    let params = new HttpParams()
    .set('lat',lat)
    .set('lon',lon)
    .set('units','imperial')
    .set('appid',this.apiKey)
    return this.http.get(this.url,{params});  
  }
  getWeatherDataByCityName(city:string){
    let params = new HttpParams()
    .set('q',city)
    .set('units','imperial')
    .set('appid',this.apiKey)
    return this.http.get(this.url,{params});  
  }
}
