import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Location } from '../utils/constant/location';

@Injectable({
  providedIn: 'root'
})
export class MapLocationService {

  constructor(
    private http: HttpClient
  ) { }

  public SearchLocationByNominatim(details: string): Observable<Location[]> {
    return this.http.get<Location[]>(`https://nominatim.openstreetmap.org/search?format=json&addressdetails=1&q=${details}&polygon_geojson=1&bounded=0&limit=10`);
  }

  public ReverseSearchLocationByNominatim(lat: string | number, lon: string | number): Observable<any> {
    return this.http.get<any>(`https://nominatim.openstreetmap.org/reverse?format=geojson&lat=${lat}&lon=${lon}`)
  }
}
